import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  take,
  takeUntil,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { setSearchValue as setFilterValues } from '../../store/filters/filters.actions';
import { MatSelectModule } from '@angular/material/select';
import { FilterState, FormFilter } from '../../_interfaces/filter.interface';
import { getFilters } from '../../store/filters/filters.selectors';
import { APP_ROUTES_ENUM } from '../../app.routes';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

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
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private unsubscribe$: Subject<void> = new Subject<void>();
  appRoute = APP_ROUTES_ENUM;

  FilterForm!: FormGroup;

  ngOnInit(): void {
    this.FilterForm = this.fb.group({
      filterBy: this.fb.control(''),
      query: this.fb.control(''),
    });

    this.store
      .select(getFilters)
      .pipe(take(1))
      .subscribe((data: FilterState) => {
        this.FilterForm.setValue({
          filterBy: data.filterBy,
          query: data.query,
        });
      });

    this.FilterForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((val: FormFilter) => {
        console.log(val);
        this.store.dispatch(setFilterValues(val));
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
