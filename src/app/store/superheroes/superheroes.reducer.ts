import { createReducer, on } from '@ngrx/store';
import * as superHeroesActions from './superheroes.actions';
import { Hero } from '../../_interfaces/hero.interface';

export interface SuperHeroState {
  superheroes: Hero[];
  loading: boolean;
}

export type FilterBy = 'id' | 'name';

export interface FilterHero {
  filterBy: FilterBy;
  filterValue: string;
  pageSize: number;
  currentPage: 1;
}

const layoutInitial: SuperHeroState = {
  superheroes: [],
  loading: false,
};

const _heroesReducer = createReducer(
  layoutInitial,
  on(
    superHeroesActions.toggleLoadingHeroes,
    (state: SuperHeroState, action) => {
      const newVal = { ...state };
      newVal.loading = action.payload;
      return newVal;
    }
  ),
  on(superHeroesActions.loadHeroesSuccess, (state: SuperHeroState, action) => {
    const newVal = { ...state };
    newVal.superheroes = action.payload;
    return newVal;
  }),

  on(superHeroesActions.removeHero, (state: SuperHeroState, action) => {
    const newVal = { ...state };
    const newList = newVal.superheroes.filter((hero) => {
      return hero._id !== action.hero._id;
    });
    newVal.superheroes = newList;
    return newVal;
  })
);

export function heroesReducer(state: any, action: any) {
  return _heroesReducer(state, action);
}
