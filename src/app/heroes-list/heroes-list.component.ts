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
import { Store } from '@ngrx/store';
import * as searchActions from '../_store/search/search.actions';
import {
  selectHeroes,
  selectHeroesPaginationInfo,
} from '../_store/heroes/heroes.selectors';

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
  private store = inject(Store);
  private unsubscribe$: Subject<void> = new Subject<void>();
  private dialog = inject(MatDialog);
  private snackbarService = inject(SnackbarService);
  private heroesService = inject(HeroesService);

  heroList$ = this.store.select(selectHeroes);
  heroesPaginationInfo$ = this.store.select(selectHeroesPaginationInfo);

  prevPage() {
    this.store.dispatch(searchActions.prevPage());
  }
  nextPage() {
    this.store.dispatch(searchActions.nextPage());
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
            .removeHero(hero)
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
