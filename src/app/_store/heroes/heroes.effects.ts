import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { loadHeroes, loadHeroesSuccess } from './heroes.actions';
import { HeroesService } from '../../_services/heroes.service';

@Injectable()
export class HeroesEffects {
  constructor(
    private actions$: Actions,
    private heroesService: HeroesService,
  ) {}

  loadHeroes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadHeroes),
      mergeMap(() => {
        return this.heroesService.getHeroesDB().pipe(
          map((heroes) => loadHeroesSuccess({ payload: heroes })),
          catchError(() => {
            return EMPTY;
          }),
        );
      }),
    );
  });
}
