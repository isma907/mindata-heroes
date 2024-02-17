import { Routes } from '@angular/router';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';
import { AuthGuard } from './_guard/auth.guard';
import { LoginComponent } from './login/login.component';

export enum APP_ROUTES_ENUM {
  HOMEPAGE = '',
  ADD_HERO = 'add-new',
  EDIT_HERO = 'edit',
  LOGIN = 'login',
}

export const routes: Routes = [
  { path: APP_ROUTES_ENUM.HOMEPAGE, component: HeroesListComponent },
  {
    path: APP_ROUTES_ENUM.ADD_HERO,
    component: HeroDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: APP_ROUTES_ENUM.EDIT_HERO + '/:id',
    component: HeroDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: APP_ROUTES_ENUM.LOGIN, component: LoginComponent },
  { path: '**', redirectTo: APP_ROUTES_ENUM.HOMEPAGE },
];
