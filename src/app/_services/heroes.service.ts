import { Injectable, inject, signal } from '@angular/core';
import { Hero, SuperHeroApiResponse } from '../_interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FILTER_BY, filterData } from '../_interfaces/filter.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  http = inject(HttpClient);
  private heroesEndpoint = 'http://localhost:4000/superheroes';

  heroesSignal = signal<SuperHeroApiResponse>({
    currentPage: 1,
    data: [],
  });

  searchSignal = signal<filterData>({
    filterBy: FILTER_BY.name,
    limit: 12,
    page: 1,
    search: '',
  });

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
    return this.http.put<Hero>(`${this.heroesEndpoint}/update`, hero);
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.heroesEndpoint}/add`, hero).pipe(
      tap((res) => {
        this.heroesSignal().data.unshift(res);
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
