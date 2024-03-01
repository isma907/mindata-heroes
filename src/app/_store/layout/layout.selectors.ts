import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LayoutState } from '../../_interfaces/layout.interface';

export const selectLayoutFeature = createFeatureSelector<LayoutState>('layout');

export const selectLayout = createSelector(
  selectLayoutFeature,
  (state: LayoutState) => state,
);

export const selectLoading = createSelector(
  selectLayoutFeature,
  (state: LayoutState) => state.loading,
);
