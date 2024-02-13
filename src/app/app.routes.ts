import { Routes } from '@angular/router';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';

export enum APP_ROUTES_ENUM {
  HOMEPAGE = '',
  ADD_HERO = 'add-new',
  EDIT_HERO = 'edit',
}

export const routes: Routes = [
  { path: APP_ROUTES_ENUM.HOMEPAGE, component: HeroesListComponent },
  { path: APP_ROUTES_ENUM.ADD_HERO, component: HeroDetailsComponent },
  {
    path: APP_ROUTES_ENUM.EDIT_HERO + '/:id',
    component: HeroDetailsComponent,
  },
];
