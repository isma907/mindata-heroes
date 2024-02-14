import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../_services/loading.service';
import { SnackbarService } from '../_services/snackbar.service';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const loadingService = inject(LoadingService);
  const snackbarService = inject(SnackbarService);

  loadingService.setLoading(true);
  return next(req).pipe(
    delay(2000),
    finalize(() => loadingService.setLoading(false)),
    catchError((error) => {
      snackbarService.showSnackbar('Oops, algo no salió bien');
      return EMPTY;
    })
  );
};
