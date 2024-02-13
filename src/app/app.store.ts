import { ActionReducerMap } from '@ngrx/store';
import { heroesReducer } from './store/superheroes/superheroes.reducer';
import { filterReducer } from './store/filters/filters.reducer';

export const appReducers: ActionReducerMap<any> = {
  superheroes: heroesReducer,
  filters: filterReducer,
};
