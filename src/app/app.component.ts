import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroesService } from './_services/heroes.service';

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
  appLoading = computed(() => {
    return this.heroesService.loadingSignal();
  });

  heroesService = inject(HeroesService);

  ngOnInit() {
    this.heroesService.setLoading(true);
    this.heroesService.getAllHeroes().subscribe(() => {
      this.heroesService.setLoading(false);
    });
  }
}
