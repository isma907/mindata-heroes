import { Component, OnDestroy, inject } from '@angular/core';
import { Hero } from '../_interfaces/hero.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../_components/confirm-delete/confirm-delete.component';
import { CommonModule } from '@angular/common';
import { HeroCardComponent } from '../_components/hero-card/hero-card.component';
import { Subject, takeUntil } from 'rxjs';
import { HeroesService } from '../_services/heroes.service';
import { SnackbarService } from '../_services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mindata-heroes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    HeroCardComponent,
    MatButtonModule,
  ],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
})
export class HeroesListComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private dialog = inject(MatDialog);
  private snackbarService = inject(SnackbarService);
  private heroesService = inject(HeroesService);

  prevPage() {
    this.heroesService.goPrevPage();
  }
  nextPage() {
    this.heroesService.goNextPage();
  }

  get heroData() {
    return this.heroesService.getHeroSignal;
  }

  get loading() {
    return this.heroesService.loading;
  }

  get paginationData() {
    return this.heroesService.paginationInfo;
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
                `${hero.name} eliminado correctamente`,
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
