import { Component, OnDestroy, OnInit, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subject } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { APP_ROUTES_ENUM } from '../../app.routes';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HeroesService } from '../../_services/heroes.service';
import { filterData } from '../../_interfaces/filter.interface';
import { LoadingService } from '../../_services/loading.service';

@Component({
  selector: 'mindata-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private heroesService = inject(HeroesService);
  private loadingService = inject(LoadingService);
  private unsubscribe$: Subject<void> = new Subject<void>();
  appRoute = APP_ROUTES_ENUM;

  FilterForm!: FormGroup;

  get loading() {
    return this.loadingService.loading;
  }

  ngOnInit(): void {
    this.FilterForm = this.fb.group({
      filterBy: this.fb.control('name'),
      query: this.fb.control(''),
    });
  }

  search() {
    const formVal = this.FilterForm.value;

    const query: filterData = {
      filterBy: formVal.filterBy,
      search: formVal.query,
      page: 1,
      limit: 24,
    };

    this.heroesService.searchSignal.set(query);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
