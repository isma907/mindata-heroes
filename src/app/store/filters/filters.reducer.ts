import { createReducer, on } from '@ngrx/store';

import {
  setSearchValue,
  updatePagination as updatePageSize,
} from './filters.actions';
import { FilterState, FormFilter } from '../../_interfaces/filter.interface';

export const initialState: FilterState = {
  query: '',
  filterBy: 'name',
  pageIndex: 0,
  pageSize: 24,
};

const _paginationReducer = createReducer(
  initialState,
  on(setSearchValue, (state: FilterState, action: FormFilter) => {
    return {
      ...state,
      query: action.query,
      filterBy: action.filterBy,
      pageIndex: 0,
    };
  }),
  on(updatePageSize, (state: FilterState, action) => {
    return {
      ...state,
      pageSize: action.pageSize,
      pageIndex: action.pageIndex,
    };
  })
);

export function filterReducer(state: FilterState, action: any) {
  return _paginationReducer(state, action);
}
