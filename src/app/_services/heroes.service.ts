import { Injectable, inject } from '@angular/core';
import { Hero } from '../_interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  http = inject(HttpClient);
  heroes: Hero[] = [];
  private heroesEndpoint = 'assets/superheroes.json';

  getData(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesEndpoint).pipe(
      delay(1000), // Para simular una llamada a un servidor y demorar la carga
      tap((res) => {
        this.heroes = res;
      })
    );
  }

  addHero(hero: Hero) {
    this.heroes.unshift(hero);
  }

}
