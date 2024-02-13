import { createAction, props } from '@ngrx/store';
import { Hero } from '../../_interfaces/hero.interface';

export const toggleLoadingHeroes = createAction(
  '[HEROES] loading',
  props<{ payload: boolean }>()
);
export const fetchHeroes = createAction('[HEROES] fetch superheroes');
export const loadHeroesSuccess = createAction(
  '[HEROES] Load superhero success',
  props<{ payload: Hero[] }>()
);
export const searchHero = createAction(
  '[HEROES] search superhero',
  props<{ name: string }>()
);
export const saveHero = createAction('[HEROES] Save superhero', props<Hero>());

export const removeHero = createAction(
  '[HEROES] Remove superhero',
  props<{ hero: Hero }>()
);
