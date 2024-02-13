import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Hero, filteredData } from '../_interfaces/hero.interface';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../_components/confirm-delete/confirm-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { selectFilteredSuperheroes } from '../store/superheroes/superheroes.selectors';
import { HeroCardComponent } from '../_components/hero-card/hero-card.component';
import { removeHero } from '../store/superheroes/superheroes.actions';
import { HeroPaginatorComponent } from '../_components/hero-paginator/hero-paginator.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { HeaderComponent } from '../_components/header/header.component';

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
    HeroPaginatorComponent,
    HeaderComponent,
  ],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.scss',
  animations: [
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HeroesListComponent implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private store = inject(Store);
  private dialog = inject(MatDialog);

  heroList$: Observable<filteredData> = this.store.select(
    selectFilteredSuperheroes
  );

  delete(hero: Hero) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: hero,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.store.dispatch(removeHero({ hero: hero }));
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
