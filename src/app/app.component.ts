import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_components/header/header.component';
import { Store } from '@ngrx/store';
import { fetchHeroes } from './store/superheroes/superheroes.actions';
import { getSuperHeroesLoading } from './store/superheroes/superheroes.selectors';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  loadingList$ = this.store.select(getSuperHeroesLoading);

  ngOnInit() {
    this.store.dispatch(fetchHeroes());
  }
}
