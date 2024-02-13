import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { getHeroById } from '../store/superheroes/superheroes.selectors';
import {
  saveHeroSuccess,
  toggleLoadingHeroes,
} from '../store/superheroes/superheroes.actions';
import { Subject, take, takeUntil } from 'rxjs';
import { HeroesService } from '../_services/heroes.service';
import { HeroDialogComponent } from '../_components/dialog-success-added/dialog-success-added.component';
import { MatDialog } from '@angular/material/dialog';

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
  ],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss',
})
export class HeroDetailsComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private heroService = inject(HeroesService);
  private dialog = inject(MatDialog);
  formHero!: FormGroup;
  _id: string | null = null;

  ngOnInit() {
    this.formHero = this.fb.group({
      _id: this.fb.control(''),
      name: this.fb.control('', [Validators.required]),
      imageUrl: this.fb.control('', [Validators.required, imageUrlValidator()]),
      firstAppearance: this.fb.control('', [Validators.required]),
      publisher: this.fb.control('', [Validators.required]),
    });

    this.route.paramMap.subscribe((params) => {
      this._id = params.get('id');
      if (this._id) {
        this.store
          .pipe(takeUntil(this.unsubscribe$), select(getHeroById(this._id)))
          .subscribe((data: Hero) => {
            this.formHero.patchValue(data);
          });
      }
    });
  }

  saveHero() {
    if (this.formHero.valid) {
      const heroData: Hero = this.formHero.value;
      this.store.dispatch(toggleLoadingHeroes({ payload: true }));
      this.heroService
        .saveHero(heroData)
        .pipe(take(1))
        .subscribe((hero) => {
          this.store.dispatch(saveHeroSuccess(hero));
          this.store.dispatch(toggleLoadingHeroes({ payload: false }));
          this.dialog.open(HeroDialogComponent);
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
