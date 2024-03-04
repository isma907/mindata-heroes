import {
  Action,
  ActionReducer,
  createFeatureSelector,
  createReducer,
  on,
} from '@ngrx/store';
import { LayoutState } from '../../_interfaces/layout.interface';
import * as layoutActions from './layout.actions';

const initialState: LayoutState = {
  loading: false,
};

export const selectSearchFeature = createFeatureSelector<LayoutState>('layout');

const _layoutReducer = createReducer(
  initialState,
  on(layoutActions.setLoading, (state: LayoutState, action): LayoutState => {
    const newVal = { ...state, ...action };
    return newVal;
  }),
);

export const layoutReducer: ActionReducer<LayoutState, Action> = (
  state = initialState,
  action: Action,
) => {
  return _layoutReducer(state, action);
};
