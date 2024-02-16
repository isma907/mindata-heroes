import { Injectable, inject, signal } from '@angular/core';
import { AppUser, AuthCredentials } from '../_interfaces/auth.interface';
import { HeroesService } from './heroes.service';
import { Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';
import { APP_ROUTES_ENUM } from '../app.routes';

const mainUser: AppUser = {
  username: 'mindata',
  displayName: 'Mindata',
  email: 'isma907@gmail.com',
  password: 'mindata',
  birthday: '20/09/1991',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  heroesService = inject(HeroesService);
  snackbarService = inject(SnackbarService);
  router = inject(Router);

  isAuthenticatedSignal = signal(false);
  loggedUserSignal = signal<AppUser>({});

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSignal();
  }

  get loggedUserData(): AppUser {
    return this.loggedUserSignal();
  }

  get loading(): boolean {
    return this.heroesService.loading;
  }

  login(credentials: AuthCredentials): Observable<boolean> {
    this.heroesService.setLoading(true);

    return new Observable<boolean>((observer) => {
      this.heroesService.setLoading(true);
      setTimeout(() => {
        if (
          credentials.username === mainUser.username &&
          credentials.password === mainUser.password
        ) {
          this.loggedUserSignal.set(mainUser);
          this.isAuthenticatedSignal.set(true);
          observer.next(true);
          observer.complete();
        } else {
          this.snackbarService.showSnackbar('Credenciales incorrectas');
          observer.error();
        }
        this.heroesService.setLoading(false);
      }, 1000);
    });
  }

  logout(): void {
    this.isAuthenticatedSignal.set(false);
    this.loggedUserSignal.set({});
    this.router.navigate([APP_ROUTES_ENUM.HOMEPAGE]);
  }
}
