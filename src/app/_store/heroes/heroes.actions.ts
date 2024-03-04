import { createAction, props } from '@ngrx/store';
import { Hero } from '../../_interfaces/hero.interface';

export const loadHeroes = createAction('[Heroes] Load heroes');
export const loadHeroesSuccess = createAction(
  '[Heroes] Load heroes success',
  props<{ payload: Hero[] }>(),
);

export const addHero = createAction(
  '[Heroes] Add hero',
  props<{ hero: Hero }>(),
);

export const updateHero = createAction(
  '[Heroes] Update hero',
  props<{ hero: Hero }>(),
);

export const removeHero = createAction(
  '[Heroes] Remove heroes',
  props<{ hero: Hero }>(),
);
