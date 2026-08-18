import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // Utilisateur connecté
  if (authService.isLoggedIn()) {
    return true;
  }

  // Utilisateur non connecté
  return router.createUrlTree(['/login']);
};