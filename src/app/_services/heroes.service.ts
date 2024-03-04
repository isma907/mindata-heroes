import { Injectable, inject } from '@angular/core';
import { Hero } from '../_interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, take, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { SnackbarService } from './snackbar.service';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import {
  addHero,
  removeHero,
  updateHero,
} from '../_store/heroes/heroes.actions';
import {
  selectHeroById,
  selectHeroesFeature,
} from '../_store/heroes/heroes.selectors';
import { setLoading } from '../_store/layout/layout.actions';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  http = inject(HttpClient);
  private store = inject(Store);
  private snackbarService = inject(SnackbarService);
  private heroesEndpoint = `${environment.apiURL}`;

  /**
 Se carga la lista entera una vez que se hace GET por primera vez del archivo JSON 
 luego se filtra dentro de la app
  */

  setLoading(enable: boolean) {
    this.store.dispatch(setLoading({ loading: enable }));
  }

  getHeroesDB(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesEndpoint).pipe(
      tap((res) => {
        return res;
      }),
    );
  }

  getHeroById(_id: string): Observable<Hero> {
    this.setLoading(true);
    return new Observable<Hero>((observer) => {
      setTimeout(() => {
        this.store
          .select(selectHeroById(_id))
          .pipe()
          .subscribe((hero) => {
            this.setLoading(false);
            observer.next(hero);
            observer.complete();
          });
      }, 1200);
    });
  }

  removeHero(hero: Hero): Observable<Hero> {
    this.setLoading(true);
    return new Observable<Hero>((observer) => {
      setTimeout(() => {
        this.store.dispatch(removeHero({ hero }));
        observer.next();
        observer.complete();
      }, 1200);
    }).pipe(
      finalize(() => {
        this.setLoading(false);
      }),
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    this.setLoading(true);
    return new Observable<Hero>((observer) => {
      setTimeout(() => {
        this.store
          .select(selectHeroesFeature)
          .pipe(take(1))
          .subscribe((store) => {
            const heroesDB = store.list;
            const allowAdd = this.allowedToAdd(hero, true, heroesDB);
            if (allowAdd) {
              const msg = 'Ya existe un Hero con este nombre';
              this.snackbarService.showSnackbar(msg);
              observer.error(msg);
            } else {
              const newHero = { ...hero, _id: uuid() };
              this.store.dispatch(addHero({ hero: newHero }));
              observer.next(newHero);
              observer.complete();
            }
          });
      }, 1200);
    }).pipe(
      finalize(() => {
        this.setLoading(false);
      }),
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    this.setLoading(true);
    return new Observable<Hero>((observer) => {
      setTimeout(() => {
        this.store
          .select(selectHeroesFeature)
          .pipe(take(1))
          .subscribe((store) => {
            const heroesDB = store.list;
            const allowAdd = this.allowedToAdd(hero, false, heroesDB);
            if (allowAdd) {
              const msg = 'Ya existe un Hero con este nombre';
              this.snackbarService.showSnackbar(msg);
              observer.error(msg);
            } else {
              this.store.dispatch(updateHero({ hero: hero }));
              observer.next(hero);
              observer.complete();
            }
          });
      }, 1200);
    }).pipe(
      finalize(() => {
        this.setLoading(false);
      }),
    );
  }

  private allowedToAdd(hero: Hero, isInsertion: boolean, heroList: Hero[]) {
    const loweredCaseName = hero.name.toLowerCase();
    if (isInsertion) {
      return heroList.some(
        (item) => item.name.toLowerCase() === loweredCaseName,
      );
    } else {
      return heroList.some(
        (item) =>
          item.name.toLowerCase() === loweredCaseName && item._id !== hero._id,
      );
    }
  }
}
