import { Injectable, inject } from '@angular/core';
import { Hero } from '../_interfaces/hero.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  http = inject(HttpClient);
  heroes: Hero[] = [];

  getData(): Observable<Hero[]> {
    return this.http.get<Hero[]>('assets/superheroes.json').pipe(
      delay(1000) // Para simular una llamada a un servidor y demorar la carga
    );
  }

  addHero(hero: Hero) {
    this.heroes.push(hero);
  }
}
