import { ActionReducerMap } from '@ngrx/store';
import { heroesReducer } from './heroes/heroes.reducer';
import { searchReducer } from './search/search.reducer';
import { layoutReducer } from './layout/layout.reducer';
import { SearchState } from '../_interfaces/filter.interface';
import { HeroesStore } from '../_interfaces/hero.interface';
import { LayoutState } from '../_interfaces/layout.interface';

export interface AppState {
  layout: LayoutState;
  search: SearchState;
  heroes: HeroesStore;
}

export const appReducers: ActionReducerMap<AppState> = {
  layout: layoutReducer,
  search: searchReducer,
  heroes: heroesReducer,
};
