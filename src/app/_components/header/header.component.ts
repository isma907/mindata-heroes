import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subject } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { APP_ROUTES_ENUM } from '../../app.routes';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { HeroesService } from '../../_services/heroes.service';
import { filterData } from '../../_interfaces/filter.interface';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common';

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
  private fb = inject(FormBuilder);
  private heroesService = inject(HeroesService);
  private authService = inject(AuthService);
  private unsubscribe$: Subject<void> = new Subject<void>();
  appRoute = APP_ROUTES_ENUM;

  FilterForm!: FormGroup;

  get loading() {
    return this.heroesService.loading;
  }

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
    const query: filterData = {
      filterBy: formVal.filterBy,
      search: formVal.query,
      limit: this.heroesService.searchSignal().limit,
      page: 1,
    };
    this.heroesService.searchSignal.update((data) => {
      return { data, ...query };
    });
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
