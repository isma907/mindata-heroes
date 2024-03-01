import { createAction, props } from '@ngrx/store';
import { SearchState } from '../../_interfaces/filter.interface';

export const setSearch = createAction(
  '[Search] Set search',
  props<{ payload: SearchState }>(),
);

export const prevPage = createAction('[Search] Prev page');
export const nextPage = createAction('[Search] Next page');
