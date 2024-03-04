import {
  Action,
  ActionReducer,
  createFeatureSelector,
  createReducer,
  on,
} from '@ngrx/store';
import * as searchActions from './search.actions';
import { FILTER_BY, SearchState } from '../../_interfaces/filter.interface';

export const initialState: SearchState = {
  filterBy: FILTER_BY.id,
  limit: 12,
  page: 1,
  search: '',
};

export const selectSearchState = createFeatureSelector<SearchState>('search');

const _searchReducer = createReducer(
  initialState,
  on(searchActions.setSearch, (state: SearchState, action): SearchState => {
    const newVal = { ...state, ...action.payload };
    return newVal;
  }),

  on(searchActions.nextPage, (state: SearchState): SearchState => {
    const newVal = { ...state };
    newVal.page++;
    return newVal;
  }),

  on(searchActions.prevPage, (state: SearchState): SearchState => {
    const newVal = { ...state };
    newVal.page--;
    return newVal;
  }),
);

export const searchReducer: ActionReducer<SearchState, Action> = (
  state = initialState,
  action: Action,
) => {
  return _searchReducer(state, action);
};
