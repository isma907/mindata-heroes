import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap, finalize } from 'rxjs/operators';

import {
  fetchHeroes,
  toggleLoadingHeroes as toggleLoading,
} from './superheroes.actions';
import { HeroesService } from '../../_services/heroes.service';
import { Store } from '@ngrx/store';

@Injectable()
export class SuperHeroesEffects {
  private actions$ = inject(Actions);
  private heroService = inject(HeroesService);
  private store = inject(Store);

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchHeroes),
      tap((res) => {
        this.store.dispatch(toggleLoading({ payload: true }));
      }),
      mergeMap(() =>
        this.heroService.getData().pipe(
          map((movies) => ({
            type: '[HEROES] Load superhero success',
            payload: movies,
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
