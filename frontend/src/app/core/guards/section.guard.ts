import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export const sectionGuard = (
  requiredSection: string
): CanActivateFn => {

  return () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    // =====================================================
    // 1. Vérifier si l'utilisateur est connecté
    // =====================================================

    if (!authService.isLoggedIn()) {

      return router.createUrlTree([
        '/login'
      ]);
    }

    // =====================================================
    // 2. Vérifier la section
    // =====================================================

    if (
      authService.hasSection(requiredSection)
    ) {

      return true;
    }

    // =====================================================
    // 3. Utilisateur connecté mais non autorisé
    // =====================================================

    return router.createUrlTree([
      '/'
    ]);
  };
};