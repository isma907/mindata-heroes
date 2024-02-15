import { Injectable, inject, signal } from '@angular/core';
import {
  Hero,
  PaginationInfo,
  SuperHeroApiResponse,
} from '../_interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FILTER_BY, filterData } from '../_interfaces/filter.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  http = inject(HttpClient);
  private heroesEndpoint = `${environment.apiURL}`;

  heroesSignal = signal<SuperHeroApiResponse>({
    currentPage: 1,
    totalResults: undefined,
    data: [],
  });

  searchSignal = signal<filterData>({
    filterBy: FILTER_BY.name,
    limit: 12,
    page: 1,
    search: '',
  });

  get heroSignal() {
    return this.heroesSignal();
  }

  get getPaginationData() {
    const heroSignal = this.heroesSignal();
    const paginationData: PaginationInfo = {
      totalResults: heroSignal.totalResults,
      currentPage: heroSignal.currentPage,
      totalPages: heroSignal.totalPages,
      prevPage: heroSignal.prevPage,
      nextPage: heroSignal.nextPage,
    };
    return paginationData;
  }

  searchHeroes(filter: filterData): Observable<SuperHeroApiResponse> {
    const query = `?search=${filter.search ?? ''}&filterBy=${
      filter.filterBy ?? 'name'
    }&page=${filter.page ?? 1}&limit=${filter.limit ?? 1}`;
    const fullURL = `${this.heroesEndpoint}${query}`;
    return this.http.get<SuperHeroApiResponse>(fullURL).pipe(
      tap((res) => {
        this.heroesSignal.set(res);
        return res;
      })
    );
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.heroesEndpoint}/getHeroById/${id}`);
  }

  removeHero(id: string) {
    return this.http
      .delete<Hero>(`${this.heroesEndpoint}/deleteHero/${id}`)
      .pipe(
        tap(() => {
          this.heroesSignal.update((store) => {
            store.totalResults = store.totalResults
              ? store.totalResults - 1
              : 0;
            const testData = store.data.filter((item) => {
              return item._id != id;
            });
            store.data = testData;
            return store;
          });
        })
      );
  }

  saveHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.heroesEndpoint}/update`, hero).pipe(
      tap((hero) => {
        this.heroesSignal.update((store) => {
          store.data = store.data.map((item) => {
            if (item._id === hero._id) {
              return hero;
            }
            return item;
          });

          return store;
        });
      })
    );
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.heroesEndpoint}/add`, hero).pipe(
      tap((res) => {
        this.heroesSignal().data.unshift(res);
        this.heroesSignal.update((store) => {
          store.totalResults = store.totalResults ? store.totalResults + 1 : 0;
          return store;
        });
      })
    );
  }

  setHeroes(heroes: SuperHeroApiResponse) {
    this.heroesSignal.update((store) => {
      store.data = heroes.data;
      return store;
    });
  }

  goNextPage() {
    const data = this.searchSignal();
    this.searchSignal.set({ ...data, page: data.page + 1 });
  }

  goPrevPage() {
    const data = this.searchSignal();
    this.searchSignal.set({ ...data, page: data.page - 1 });
  }
}
