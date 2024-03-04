import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './_components/header/header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { selectLoading } from './_store/layout/layout.selectors';
import * as heroesActions from './_store/heroes/heroes.actions';

@Component({
  selector: 'mindata-app-root',
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
export class AppComponent implements OnInit, AfterContentChecked {
  private cdRef = inject(ChangeDetectorRef);
  private store = inject(Store);

  loading$ = this.store.select(selectLoading);

  ngOnInit(): void {
    this.store.dispatch(heroesActions.loadHeroes());
  }

  ngAfterContentChecked() {
    this.cdRef.detectChanges();
  }
}
