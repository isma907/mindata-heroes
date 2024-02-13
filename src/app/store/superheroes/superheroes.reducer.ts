import { createReducer, on } from '@ngrx/store';
import * as superHeroesActions from './superheroes.actions';
import { SuperHeroState } from '../../_interfaces/hero.interface';
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

  on(superHeroesActions.saveHero, (state: SuperHeroState, hero) => {
    const newVal = { ...state };

    if (hero._id) {
      newVal.list = newVal.list.map((item) => {
        if (item._id === hero._id) {
          return hero;
        }
        return item;
      });
    } else {
      debugger;
      const newId = uuid();
      const newHero = { ...hero };
      newHero._id = newId;
      newVal.list = [newHero, ...newVal.list];
      console.log(newVal);
    }
    return newVal;
  })
);

export function heroesReducer(state: any, action: any) {
  return _heroesReducer(state, action);
}
