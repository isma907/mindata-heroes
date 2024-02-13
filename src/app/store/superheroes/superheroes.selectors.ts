import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  Hero,
  SuperHeroState,
  filteredData,
} from '../../_interfaces/hero.interface';
import { getFilters } from '../filters/filters.selectors';
import { FilterState } from '../../_interfaces/filter.interface';

export const superHeroesFeature =
  createFeatureSelector<SuperHeroState>('superheroes');

export const getSuperHeroes = createSelector(
  superHeroesFeature,
  (state: SuperHeroState) => state.list
);

export const getSuperHeroesLoading = createSelector(
  superHeroesFeature,
  (state: SuperHeroState) => state.loading
);

export const getHeroById = (_id: string) =>
  createSelector(superHeroesFeature, (state: SuperHeroState): Hero => {
    return state.list.filter((item) => item._id === _id)[0];
  });

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
