import { createReducer, on } from '@ngrx/store';
import * as superHeroesActions from './superheroes.actions';
import { Hero, SuperHeroState } from '../../_interfaces/hero.interface';
import { v4 as uuid } from 'uuid';

export type FilterBy = 'id' | 'name';

export interface FilterHero {
  filterBy: FilterBy;
  filterValue: string;
  pageSize: number;
  currentPage: 1;
}

const layoutInitial: SuperHeroState = {
  list: [],
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
    newVal.list = action.payload;
    return newVal;
  }),

  on(superHeroesActions.removeHero, (state: SuperHeroState, action) => {
    const newVal = { ...state };
    const newList = newVal.list.filter((hero) => {
      return hero._id !== action.hero._id;
    });
    newVal.list = newList;
    return newVal;
  }),

  on(
    superHeroesActions.saveHeroSuccess,
    (state: SuperHeroState, payload: Hero) => {
      const newVal = { ...state };

      if (payload._id) {
        newVal.list = newVal.list.map((item) => {
          if (item._id === payload._id) {
            return payload;
          }
          return item;
        });
      } else {
        const newId = uuid();
        const newHero = { ...payload };
        newHero._id = newId;
        newVal.list = [newHero, ...newVal.list];
      }
      return newVal;
    }
  )
);

export function heroesReducer(state: any, action: any) {
  return _heroesReducer(state, action);
}
