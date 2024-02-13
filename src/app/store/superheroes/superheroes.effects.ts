import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  tap,
  finalize,
} from 'rxjs/operators';

import {
  fetchHeroes,
  toggleLoadingHeroes as toggleLoading,
} from './superheroes.actions';
import { HeroesService } from '../../_services/heroes.service';
import { Store } from '@ngrx/store';
import { Hero } from '../../_interfaces/hero.interface';
import { Router } from '@angular/router';
import { APP_ROUTES_ENUM } from '../../app.routes';

@Injectable()
export class SuperHeroesEffects {
  private actions$ = inject(Actions);
  private heroService = inject(HeroesService);
  private store = inject(Store);
  private router = inject(Router);

  loadHeroes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchHeroes),
      tap((res) => {
        this.store.dispatch(toggleLoading({ payload: true }));
      }),
      mergeMap(() =>
        this.heroService.getData().pipe(
          map((heroes) => ({
            type: '[HEROES] Load superhero success',
            payload: heroes,
          })),
          catchError(() => EMPTY),
          finalize(() => {
            this.store.dispatch(toggleLoading({ payload: false }));
          })
        )
      )
    )
  );
}
