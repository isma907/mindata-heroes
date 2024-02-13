import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from './filters.reducer';
export const filtersFeature = createFeatureSelector<FilterState>('filters');

export const getFilters = createSelector(
  filtersFeature,
  (state: FilterState) => state
);
