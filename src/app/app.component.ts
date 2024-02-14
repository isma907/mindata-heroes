import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroesService } from './_services/heroes.service';
import { LoadingService } from './_services/loading.service';

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
export class AppComponent {
  private loadingService = inject(LoadingService);

  appLoading = computed(() => {
    return this.loadingService.loadingSignal();
  });

  heroesService = inject(HeroesService);

  filterChangeEffect = effect(
    () => {
      const filters = this.heroesService.searchSignal();
      this.heroesService.searchHeroes(filters).subscribe((res) => {
        this.heroesService.setHeroes(res);
      });
    },
    { allowSignalWrites: true }
  );
}
