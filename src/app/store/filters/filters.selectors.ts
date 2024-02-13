import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilterState } from '../../_interfaces/filter.interface';
export const filtersFeature = createFeatureSelector<FilterState>('filters');

export const getFilters = createSelector(
  filtersFeature,
  (state: FilterState) => state
);
