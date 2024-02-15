import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Hero } from '../_interfaces/hero.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EMPTY, Subject, catchError, of, takeUntil } from 'rxjs';
import { HeroesService } from '../_services/heroes.service';
import { SnackbarService } from '../_services/snackbar.service';
import { APP_ROUTES_ENUM } from '../app.routes';
import { UpperCaseDirective } from '../_directives/upper-case.directive';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'mindata-hero-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    UpperCaseDirective,
  ],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss',
})
export class HeroDetailsComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private heroesService = inject(HeroesService);
  private snackbarService = inject(SnackbarService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  appRoute = APP_ROUTES_ENUM;

  formHero!: FormGroup;
  _id: string | null = null;

  loading = computed<boolean>(() => {
    return this.loadingService.loadingSignal();
  });

  ngOnInit() {
    this.formHero = this.fb.group({
      _id: this.fb.control(''),
      name: this.fb.control('', [Validators.required]),
      imageUrl: this.fb.control('', [Validators.required, imageUrlValidator()]),
      firstAppearance: this.fb.control('', [Validators.required]),
      publisher: this.fb.control('', [Validators.required]),
    });

    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        this._id = params.get('id');
        if (this._id) {
          this.heroesService
            .getHeroById(this._id)
            .pipe(
              takeUntil(this.unsubscribe$),
              catchError((error) => {
                console.log(error);
                return of(EMPTY);
              })
            )
            .subscribe((data) => {
              if (data) {
                this.formHero.setValue(data);
              }
            });
        }
      });
  }

  saveHero() {
    if (this.formHero.valid) {
      const heroData: Hero = this.formHero.value;
      const saveEndpoint = this._id
        ? this.heroesService.saveHero(heroData)
        : this.heroesService.createHero(heroData);

      saveEndpoint.pipe(takeUntil(this.unsubscribe$)).subscribe((hero) => {
        this.snackbarService.showSnackbar(
          `${heroData.name} guardado correctamente`
        );
        this.router.navigate([APP_ROUTES_ENUM.EDIT_HERO + '/' + hero._id]);
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

export function imageUrlValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const urlPattern = /^(http|https):\/\/[^ "]+$/;

    if (control.value && !urlPattern.test(control.value)) {
      return { invalidUrl: true };
    }
    return null;
  };
}
