import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectSearchState } from '../search/search.reducer';
import { Hero, HeroesStore } from '../../_interfaces/hero.interface';
import {
  PaginationInfo,
  SearchState,
} from '../../_interfaces/filter.interface';

export const selectHeroesFeature = createFeatureSelector<HeroesStore>('heroes');

export const selectHeroes = createSelector(
  selectHeroesFeature,
  selectSearchState,
  (heroes: HeroesStore, search: SearchState) => {
    const filterBy = search.filterBy;
    let filteredList = heroes.list;

    if (filterBy && search.search) {
      const searchTerm = search.search.toLowerCase();
      filteredList = heroes.list.filter((hero: Hero) =>
        hero[filterBy as keyof Hero]
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase()),
      );
    }

    const startIndex = (search.page - 1) * search.limit;
    const endIndex = startIndex + search.limit;
    filteredList = filteredList.slice(startIndex, endIndex);
    return filteredList;
  },
);

export const selectHeroesPaginationInfo = createSelector(
  selectHeroesFeature,
  selectSearchState,
  (heroes: HeroesStore, search: SearchState) => {
    const filteredData = heroes.list;
    const filteredList = filterHeroes(filteredData, search);

    const totalResults = filteredList.length;
    const totalPages = Math.ceil(totalResults / search.limit);
    const currentPage = search.page;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    const val: PaginationInfo = {
      totalResults: totalResults,
      currentPage: currentPage,
      totalPages: totalPages,
      prevPage: prevPage ?? undefined,
      nextPage: nextPage ?? undefined,
    };
    return val;
  },
);

export const selectHeroById = (_id: string) =>
  createSelector(selectHeroesFeature, (heroes: HeroesStore): Hero => {
    const res = heroes.list.filter((item) => item._id === _id);
    return res[0];
  });

function filterHeroes(filteredData: Hero[], searchSignal: SearchState): Hero[] {
  const filterBy = searchSignal.filterBy;
  let filteredList = filteredData;

  if (filterBy && searchSignal.search) {
    const searchTerm = searchSignal.search.toLowerCase();
    filteredList = filteredData.filter((hero: Hero) =>
      hero[filterBy as keyof Hero]
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase()),
    );
  }

  return filteredList;
}
