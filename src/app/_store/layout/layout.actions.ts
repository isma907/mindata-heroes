import { createAction, props } from '@ngrx/store';

export const setLoading = createAction(
  '[Layout] Set loading',
  props<{ loading: boolean }>(),
);
