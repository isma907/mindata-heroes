import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeroesService } from './_services/heroes.service';
import { HeaderComponent } from './_components/header/header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>; // Spy object for HeroesService

  beforeEach(async () => {
    // Create a spy object for HeroesService
    const spy = jasmine.createSpyObj('HeroesService', ['getHeroesDB']);

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        HeaderComponent,
      ],
      declarations: [],
      providers: [
        { provide: HeroesService, useValue: spy },
        provideMockStore({
          initialState: {
            heroes: null,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockHeroesService = TestBed.inject(
      HeroesService,
    ) as jasmine.SpyObj<HeroesService>;
  });

  it('should create AppComponent', () => {
    expect(component).toBeTruthy();
  });
});
