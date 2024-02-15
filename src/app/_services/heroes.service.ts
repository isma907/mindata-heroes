import { Injectable, computed, inject, signal } from '@angular/core';
import { Hero } from '../_interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FILTER_BY, filterData } from '../_interfaces/filter.interface';
import { environment } from '../../environments/environment';
import { v4 as uuid } from 'uuid';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  http = inject(HttpClient);
  private snackbarService = inject(SnackbarService);

  private heroesEndpoint = `${environment.apiURL}`;

  /**
 Se carga la lista entera una vez que se hace GET por primera vez del archivo JSON 
 luego se filtra dentro de la app
  */
  heroesDB = signal<Hero[]>([]);

  searchSignal = signal<filterData>({
    filterBy: FILTER_BY.name,
    limit: 12,
    page: 1,
    search: '',
  });

  heroesSignal = computed(() => {
    const filteredData = this.heroesDB();
    const searchSignal = this.searchSignal();
    const filteredList = this.filterHeroes(filteredData, searchSignal);

    const startIndex = (searchSignal.page - 1) * searchSignal.limit;
    const endIndex = startIndex + searchSignal.limit;
    const paginatedList = filteredList.slice(startIndex, endIndex);

    return paginatedList;
  });

  paginationInfoSignal = computed(() => {
    const filteredData = this.heroesDB();
    const searchSignal = this.searchSignal();
    const filteredList = this.filterHeroes(filteredData, searchSignal);

    const totalResults = filteredList.length;
    const totalPages = Math.ceil(totalResults / searchSignal.limit);
    const currentPage = searchSignal.page;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return {
      totalResults,
      currentPage,
      totalPages,
      prevPage,
      nextPage,
    };
  });

  get paginationInfo() {
    return this.paginationInfoSignal();
  }

  get getHeroSignal() {
    return this.heroesSignal();
  }

  getHeroesDB(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesEndpoint).pipe(
      tap((res) => {
        this.heroesDB.set(res);
        return res;
      })
    );
  }

  getHeroById(_id: string): Observable<Hero> {
    return new Observable<Hero>((observer) => {
      const hero = this.heroesDB().find((hero) => hero._id === _id);
      setTimeout(() => {
        observer.next(hero);
        observer.complete();
      });
    });
  }

  removeHero(id: string): Observable<Hero> {
    return new Observable<Hero>((observer) => {
      const heroToRemove = this.heroesDB().find((hero) => hero._id === id);
      if (!heroToRemove) {
        observer.error(`Hero with id ${id} not found`);
        return;
      }

      setTimeout(() => {
        this.heroesDB.update((store) => {
          return store.filter((item) => item._id !== id);
        });
        observer.next(heroToRemove);
        observer.complete();
      });
    });
  }

  addHero(hero: Hero): Observable<Hero> {
    return new Observable((observer) => {
      setTimeout(() => {
        if (this.allowedToAdd(hero, true)) {
          this.snackbarService.showSnackbar(
            'Ya existe un Hero con este nombre'
          );
        } else {
          const newHero = { ...hero, _id: uuid() };
          this.heroesDB.update((heroes) => {
            return [newHero, ...heroes];
          });
          observer.next(newHero);
          observer.complete();
        }
      }, 2000);
    });
  }

  updateHero(hero: Hero): Observable<Hero> {
    return new Observable<Hero>((observer) => {
      if (this.allowedToAdd(hero, false)) {
        this.snackbarService.showSnackbar('Ya existe un Hero con este nombre');
      } else {
        this.heroesDB.update((heroes) => {
          const index = heroes.findIndex((item) => item._id === hero._id);
          if (index !== -1) {
            heroes[index] = hero;
          }
          return [...heroes];
        });
        observer.next(hero);
        observer.complete();
      }
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

  private allowedToAdd(hero: Hero, isInsertion: boolean) {
    const heroList = this.heroesDB();
    const loweredCaseName = hero.name.toLowerCase();

    if (isInsertion) {
      const exists = heroList.some(
        (item) => item.name.toLowerCase() === loweredCaseName
      );
      return exists;
    } else {
      const exists = heroList.some(
        (item) =>
          item.name.toLowerCase() === loweredCaseName && item._id !== hero._id
      );
      return exists;
    }
  }

  private filterHeroes(filteredData: Hero[], searchSignal: filterData) {
    const filterBy = searchSignal.filterBy;
    let filteredList = filteredData;

    if (filterBy && searchSignal.search) {
      const searchTerm = searchSignal.search.toLowerCase();
      filteredList = filteredData.filter((hero: Hero) =>
        hero[filterBy as keyof Hero]
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      );
    }

    return filteredList;
  }
}
