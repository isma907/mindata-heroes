import { PageEvent } from '@angular/material/paginator';
import { createAction, props } from '@ngrx/store';
import { FormFilter } from '../../_interfaces/filter.interface';

export const setSearchValue = createAction(
  '[FILTER] Set search value',
  props<FormFilter>()
);

export const updatePagination = createAction(
  '[FILTER] Update pagination',
  props<PageEvent>()
);
