import { Injectable, inject } from '@angular/core';
import { Hero } from '../_interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  http = inject(HttpClient);
  heroes: Hero[] = [];
  private heroesEndpoint = 'assets/superheroes.json';

  getData(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesEndpoint).pipe(
      delay(1000), // Para simular una llamada a un servidor y demorar la carga, esto se guarda en el STORE gracias al EFFECT de NGRX
      tap((res) => {
        this.heroes = res;
      })
    );
  }

  saveHero(hero: Hero): Observable<any> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(hero);
        observer.complete();
      }, 1000);
    });
  }
}
