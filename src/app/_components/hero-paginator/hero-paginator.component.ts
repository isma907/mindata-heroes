import { ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FilterState } from '../../store/filters/filters.reducer';
import { getFilters } from '../../store/filters/filters.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { updatePagination } from '../../store/filters/filters.actions';
import { Hero } from '../../_interfaces/hero.interface';

@Component({
  selector: 'mindata-hero-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './hero-paginator.component.html',
  styleUrl: './hero-paginator.component.scss',
})
export class HeroPaginatorComponent {
  @Input() heroes!: Hero[];
  store = inject(Store);

  filterState$!: Observable<FilterState>;
  pageSize = 16;
  pageSizeOptions: number[] = [16, 32, 64];

  ngOnInit(): void {
    this.filterState$ = this.store.select(getFilters);
  }

  onPageChange(event: PageEvent): void {
    console.log(event);
    this.store.dispatch(updatePagination(event));
  }
}
