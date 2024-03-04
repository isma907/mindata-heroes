import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SearchState } from '../../_interfaces/filter.interface';

export const selectSearchFeature = createFeatureSelector<SearchState>('search');

export const selectMovies = createSelector(
  selectSearchFeature,
  (state: SearchState) => state,
);
