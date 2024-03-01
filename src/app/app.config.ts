import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './_interceptors/loading.interceptor';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appReducers } from './_store/app.store';
import { provideEffects } from '@ngrx/effects';
import { HeroesEffects } from './_store/heroes/heroes.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    provideAnimationsAsync(),
    provideStore(appReducers),
    provideEffects([HeroesEffects]),
    provideStoreDevtools(),
  ],
};
