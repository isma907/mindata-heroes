import { Component, OnDestroy, computed, inject } from '@angular/core';
import { Hero, filteredData } from '../_interfaces/hero.interface';

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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../_services/snackbar.service';

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
  ],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
})
export class HeroesListComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private dialog = inject(MatDialog);
  private heroService = inject(HeroesService);
  private snackbarService = inject(SnackbarService);

  paginatorData = computed(() => {
    return this.heroService.filterSignal();
  });

  allHeroes = computed(() => {
    return this.heroService.heroesSignal();
  });

  filteredHeroes = computed<filteredData>(() => {
    const filterData = this.heroService.filterSignal();
    const allHeroes = this.heroService.heroesSignal();
    const startIndex = filterData.pageIndex * filterData.pageSize;
    const endIndex = startIndex + filterData.pageSize;
    const showData = allHeroes.slice(startIndex, endIndex);

    const res: filteredData = {
      totalItems: allHeroes.length,
      showElements: showData,
    };
    return res;
  });

  delete(hero: Hero) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: hero,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.heroService.setLoading(true);
          this.heroService.removeHero(hero._id).subscribe(() => {
            this.snackbarService.showSnackbar(
              `${hero.name} eliminado correctamente`
            );
            this.heroService.setLoading(false);
          });
        }
      });
  }

  changePage(event: PageEvent) {
    this.heroService.setPaginator(event);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
