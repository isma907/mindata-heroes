import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Hero } from '../_interfaces/hero.interface';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../_components/confirm-delete/confirm-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroCardComponent } from '../_components/hero-card/hero-card.component';
import { Subject, takeUntil } from 'rxjs';
import { HeaderComponent } from '../_components/header/header.component';
import { HeroesService } from '../_services/heroes.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../_services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
import { LoadingService } from '../_services/loading.service';

@Component({
  selector: 'mindata-heroes-list',
  standalone: true,
  imports: [
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CommonModule,
    HeroCardComponent,
    HeaderComponent,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
})
export class HeroesListComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private dialog = inject(MatDialog);
  private snackbarService = inject(SnackbarService);
  private heroesService = inject(HeroesService);
  private loadingService = inject(LoadingService);

  ngOnInit(): void {}

  prevPage() {
    this.heroesService.goPrevPage();
  }
  nextPage() {
    this.heroesService.goNextPage();
  }

  get heroData() {
    return this.heroesService.heroSignal;
  }

  get loading() {
    return this.loadingService.loading;
  }

  get paginationData() {
    return this.heroesService.getPaginationData;
  }

  delete(hero: Hero) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: hero,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.heroesService
            .removeHero(hero._id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
              this.snackbarService.showSnackbar(
                `${hero.name} eliminado correctamente`
              );
            });
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
