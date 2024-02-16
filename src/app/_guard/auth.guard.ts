import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { APP_ROUTES_ENUM } from '../app.routes';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): boolean {
    if (!this.authService.isAuthenticated) {
      this.router.navigate([APP_ROUTES_ENUM.LOGIN]);
      return false;
    }
    return true;
  }
}
