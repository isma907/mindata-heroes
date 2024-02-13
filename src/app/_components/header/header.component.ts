import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime } from 'rxjs';
import { Store } from '@ngrx/store';
import { setSearchValue as setFilterValues } from '../../store/filters/filters.actions';
import { MatSelectModule } from '@angular/material/select';
import { FormFilter } from '../../_interfaces/filter.interface';

@Component({
  selector: 'mindata-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  store = inject(Store);
  fb = inject(FormBuilder);

  FilterForm!: FormGroup;

  ngOnInit(): void {
    this.FilterForm = this.fb.group({
      filterBy: this.fb.control('name'),
      query: this.fb.control(''),
    });

    this.FilterForm.valueChanges
      .pipe(debounceTime(400))
      .subscribe((val: FormFilter) => {
        this.store.dispatch(setFilterValues(val));
      });
  }
}
