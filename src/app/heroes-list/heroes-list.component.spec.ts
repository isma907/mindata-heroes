import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesListComponent } from './heroes-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroCardComponent } from '../_components/hero-card/hero-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        HttpClientTestingModule,
        HeroCardComponent,
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
