import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesListComponent } from './heroes-list.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeroesService } from '../_services/heroes.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeroCardComponent } from '../_components/hero-card/hero-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeroesListComponent', () => {
    let component: HeroesListComponent;
    let fixture: ComponentFixture<HeroesListComponent>;
    let mockMatDialog: jasmine.SpyObj<MatDialog>;
    let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;
    let mockHeroesService: jasmine.SpyObj<HeroesService>;

    beforeEach(async () => {
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
        const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['showSnackbar']);
        const heroesServiceSpy = jasmine.createSpyObj('HeroesService', ['goPrevPage', 'goNextPage', 'getHeroSignal', 'removeHero']);

        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                MatIconModule,
                MatDialogModule,
                MatButtonModule,
                HttpClientTestingModule,
                HeroCardComponent
            ],
            providers: [
                { provide: MatDialog, useValue: dialogSpy },
                { provide: MatSnackBar, useValue: snackBarSpy },
                { provide: HeroesService, useValue: heroesServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeroesListComponent);
        component = fixture.componentInstance;

        mockMatDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
        mockMatSnackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
        mockHeroesService = TestBed.inject(HeroesService) as jasmine.SpyObj<HeroesService>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
