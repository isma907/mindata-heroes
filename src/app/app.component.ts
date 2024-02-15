import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroesService } from './_services/heroes.service';
import { LoadingService } from './_services/loading.service';
import { take } from 'rxjs';

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
  private loadingService = inject(LoadingService);
  get loading() {
    return this.loadingService.loading;
  }

  heroesService = inject(HeroesService);

  ngOnInit(): void {
    this.heroesService.getHeroesDB().pipe(take(1)).subscribe();
  }
}
