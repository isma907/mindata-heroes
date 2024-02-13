import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SuperHeroState } from './superheroes.reducer';
import { Hero, filteredData } from '../../_interfaces/hero.interface';
import { getFilters } from '../filters/filters.selectors';
import { FilterState } from '../filters/filters.reducer';

export const superHeroesFeature =
  createFeatureSelector<SuperHeroState>('superheroes');

export const getSuperHeroes = createSelector(
  superHeroesFeature,
  (state: SuperHeroState) => state.superheroes
);

export const getSuperHeroesLoading = createSelector(
  superHeroesFeature,
  (state: SuperHeroState) => state.loading
);

function filterHeroes(superheroes: Hero[], filters: FilterState): Hero[] {
  return superheroes.filter((superhero) => {
    const lowerText = superhero[filters.filterBy as keyof Hero]
      .toString()
      .toLowerCase();
    return lowerText.includes(filters.query.toLowerCase());
  });
}

export const selectFilteredSuperheroes = createSelector(
  [getSuperHeroes, getFilters],
  (superheroes: Hero[], filters: FilterState): filteredData => {
    const updatedFilters = { ...filters };

    const filteredList = filterHeroes(superheroes, updatedFilters);

    const startIndex = updatedFilters.pageIndex * updatedFilters.pageSize;
    const endIndex = Math.min(
      startIndex + updatedFilters.pageSize,
      filteredList.length
    );

    const res: filteredData = {
      heroesList: filteredList,
      showElements: filteredList.slice(startIndex, endIndex),
    };
    return res;
  }
);
