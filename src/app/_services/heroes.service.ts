import { Injectable, inject, signal } from '@angular/core';
import { Hero, FILTER_BY } from '../_interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, tap } from 'rxjs';
import { FilterState } from '../_interfaces/filter.interface';
import { v4 as uuid } from 'uuid';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  http = inject(HttpClient);
  heroes: Hero[] = [];

  private heroesEndpoint = 'assets/superheroes.json';

  heroesSignal = signal<Hero[]>([]);
  loadingSignal = signal<boolean>(false);
  filterSignal = signal<FilterState>({
    filterBy: 'name',
    query: '',
    pageIndex: 0,
    pageSize: 24,
    pageSizeOptions: [24, 48, 72],
  });

  setFilter(newFilter: Partial<FilterState>) {
    this.filterSignal.update((filter) => {
      return {
        ...filter,
        ...newFilter,
        pageIndex: 0,
      };
    });
  }

  changePage(page: number) {
    this.filterSignal.update((filter) => {
      filter.pageIndex = page;
      return filter;
    });
  }

  setPaginator(page: PageEvent) {
    this.filterSignal.update((filter) => {
      const res = { ...filter, ...page };
      return res;
    });
  }

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesEndpoint).pipe(
      delay(1000),
      tap((res) => {
        this.heroes = res;
        this.heroesSignal.set(res);
      })
    );
  }

  getHeroByField(field: FILTER_BY, fieldValue: string): Observable<Hero[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        const heroes = this.heroes.filter((item) => {
          const lowerField = item[field].toLocaleLowerCase();
          const lowerVal = fieldValue.toLocaleLowerCase();
          return lowerField.indexOf(lowerVal) != -1;
        });

        this.heroesSignal.set(heroes);
        observer.next(heroes);
        observer.complete();
      }, 2000);
    });
  }

  getHeroById(id: string): Observable<Hero> {
    return new Observable((observer) => {
      setTimeout(() => {
        const hero = this.heroesSignal().filter((item) => item._id === id)[0];
        observer.next(hero);
        observer.complete();
      }, 2000);
    });
  }

  removeHero(id: string) {
    return new Observable((observer) => {
      setTimeout(() => {
        const heroes = this.heroes.filter((item) => item._id !== id);
        const current = this.heroesSignal().filter((item) => item._id !== id);

        this.heroesSignal.set(current);
        this.heroes = heroes;
        observer.next(heroes);
        observer.complete();
      }, 2000);
    });
  }

  saveHero(hero: Hero): Observable<Hero> {
    return new Observable((observer) => {
      setTimeout(() => {
        const updatedHeroes = this.updateHeroInArray(this.heroes, hero);
        this.heroes = updatedHeroes;

        this.heroesSignal.update((data) => {
          return this.updateHeroInArray(data, hero);
        });

        observer.next(hero);
        observer.complete();
      }, 2000);
    });
  }

  updateHeroInArray(array: Hero[], heroToUpdate: Hero) {
    return array.map((item) => {
      if (item._id === heroToUpdate._id) {
        return { ...item, ...heroToUpdate };
      }
      return item;
    });
  }

  addHero(hero: Hero): Observable<Hero> {
    return new Observable((observer) => {
      setTimeout(() => {
        hero._id = uuid();
        this.heroesSignal().unshift(hero);
        observer.next(hero);
        observer.complete();
      }, 1000);
    });
  }

  setLoading(enable: boolean) {
    this.loadingSignal.set(enable);
  }
}
