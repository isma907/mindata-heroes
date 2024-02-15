import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroesService } from './_services/heroes.service';
import { LoadingService } from './_services/loading.service';
import { Subject, takeUntil } from 'rxjs';

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
  private unsubscribe$: Subject<void> = new Subject<void>();

  get loading() {
    return this.loadingService.loading;
  }

  heroesService = inject(HeroesService);

  filterChangeEffect = effect(
    () => {
      const filters = this.heroesService.searchSignal();
      this.heroesService
        .searchHeroes(filters)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          this.heroesService.setHeroes(res);
        });
    },
    { allowSignalWrites: true }
  );
}
