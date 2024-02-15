import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';

import { SnackbarService } from '../_services/snackbar.service';
import { HeroesService } from '../_services/heroes.service';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const heroesService = inject(HeroesService);
  const snackbarService = inject(SnackbarService);

  heroesService.setLoading(true);
  return next(req).pipe(
    delay(2000),
    finalize(() => {
      heroesService.setLoading(false);
    }),
    catchError((error) => {
      snackbarService.showSnackbar('Oops, algo no salió bien');
      return EMPTY;
    })
  );
};
