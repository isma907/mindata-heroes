import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subject } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { setSearch } from '../../_store/search/search.actions';
import { selectLoading } from '../../_store/layout/layout.selectors';
import { initialState } from '../../_store/search/search.reducer';
import { SearchState } from '../../_interfaces/filter.interface';
import { APP_ROUTES_ENUM } from '../../app.routes';

@Component({
  selector: 'mindata-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private unsubscribe$: Subject<void> = new Subject<void>();
  loading$ = this.store.select(selectLoading);
  appRoute = APP_ROUTES_ENUM;

  FilterForm!: FormGroup;

  get loggedUser() {
    return this.authService.loggedUserData;
  }

  get isAuth() {
    return this.authService.isAuthenticated;
  }

  ngOnInit(): void {
    this.FilterForm = this.fb.group({
      filterBy: this.fb.control('name'),
      query: this.fb.control(''),
    });
  }

  search() {
    const formVal = this.FilterForm.value;
    const query: SearchState = {
      filterBy: formVal.filterBy,
      search: formVal.query,
      limit: initialState.limit,
      page: 1,
    };

    this.store.dispatch(setSearch({ payload: query }));
  }

  resetQuery() {
    this.FilterForm.patchValue({ query: '' });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
