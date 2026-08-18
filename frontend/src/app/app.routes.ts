import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { sectionGuard } from './core/guards/section.guard';
import { AppLayout } from './layout/app-layout/app-layout';

export const routes: Routes = [

  // =========================================================
  // HOME - PUBLIC
  // =========================================================

  {
    path: 'home',

    loadComponent: () =>
      import('./pages/home/home')
        .then(m => m.Home)
  },


  // =========================================================
  // LOGIN - PUBLIC
  // =========================================================

  {
    path: 'login',

    loadComponent: () =>
      import('./pages/login/login')
        .then(m => m.Login)
  },


  // =========================================================
  // ACCESS DENIED - PUBLIC
  // =========================================================

  {
    path: 'access-denied',

    loadComponent: () =>
      import('./pages/access-denied/access-denied')
        .then(m => m.AccessDenied)
  },


  // =========================================================
  // APPLICATION - LAYOUT COMMUN
  // =========================================================

  {
    path: '',

    component: AppLayout,

    canActivate: [authGuard],

    children: [

      // =====================================================
      // DASHBOARD
      // Accessible à tous les utilisateurs connectés
      // =====================================================

      {
        path: 'dashboard',

        loadComponent: () =>
          import('./pages/dashboard/dashboard')
            .then(m => m.Dashboard)
      },


      // =====================================================
      // ADHERENTS
      // =====================================================

      {
        path: 'adherents',

        canActivate: [sectionGuard],

        data: {
          section: 'ADHERENTS'
        },

        loadComponent: () =>
          import('./pages/adherents/adherents')
            .then(m => m.Adherents)
      },


      // =====================================================
      // BUREAU D'ORDRE
      // =====================================================

      {
        path: 'bureau-ordre',

        canActivate: [sectionGuard],

        data: {
          section: 'BUREAU_ORDRE'
        },

        loadComponent: () =>
          import('./pages/bureau-ordre/bureau-ordre')
            .then(m => m.BureauOrdre)
      },


      // =====================================================
      // MUTUELLE
      // =====================================================

      {
        path: 'mutuelle',

        canActivate: [sectionGuard],

        data: {
          section: 'MUTUELLE'
        },

        loadComponent: () =>
          import('./pages/mutuelle/mutuelle')
            .then(m => m.Mutuelle)
      },


      // =====================================================
      // ASSISTANCE
      // =====================================================

      {
        path: 'assistance',

        canActivate: [sectionGuard],

        data: {
          section: 'ASSISTANCE'
        },

        loadComponent: () =>
          import('./pages/assistance/assistance')
            .then(m => m.Assistance)
      },


      // =====================================================
      // RETRAITES
      // =====================================================

      {
        path: 'retraites',

        canActivate: [sectionGuard],

        data: {
          section: 'RETRAITES'
        },

        loadComponent: () =>
          import('./pages/retraites/retraites')
            .then(m => m.Retraites)
      },


      // =====================================================
      // DECES
      // =====================================================

      {
        path: 'deces',

        canActivate: [sectionGuard],

        data: {
          section: 'DECES'
        },

        children: [

          // /deces
          // ↓
          // /deces/dashboard

          {
            path: '',

            redirectTo: 'dashboard',

            pathMatch: 'full'
          },


          // =================================================
          // DASHBOARD DECES
          // =================================================

          {
            path: 'dashboard',

            loadComponent: () =>
              import('./pages/deces/dashboard/dashboard')
                .then(m => m.Dashboard)
          },


          // =================================================
          // DOSSIERS
          // =================================================

          {
            path: 'dossiers',

            loadComponent: () =>
              import('./pages/deces/dossiers/dossiers')
                .then(m => m.Dossiers)
          },


          // =================================================
          // NOUVEAU DOSSIER
          // =================================================

          {
            path: 'nouveau',

            loadComponent: () =>
              import('./pages/deces/nouveau-dossier/nouveau-dossier')
                .then(m => m.NouveauDossier)
          },


          // =================================================
          // AYANTS DROIT
          // =================================================

          {
            path: 'ayants-droit',

            loadComponent: () =>
              import('./pages/deces/ayants-droit/ayants-droit')
                .then(m => m.AyantsDroit)
          },


          // =================================================
          // DEMANDES
          // =================================================

          {
            path: 'demandes',

            loadComponent: () =>
              import('./pages/deces/demandes/demandes')
                .then(m => m.Demandes)
          },


          // =================================================
          // PIECES JUSTIFICATIVES
          // =================================================

{
  path: 'pieces-justificatives',
  loadComponent: () =>
    import('./pages/deces/pieces-justificatives/pieces-justificatives')
      .then(m => m.PiecesJustificatives)
},

{
  path: 'pieces-justificatives/dossier/:id',
  loadComponent: () =>
    import('./pages/deces/pieces-justificatives/dossier-pieces/dossier-pieces')
      .then(m => m.DossierPieces)
},

          // =================================================
          // VALIDATION
          // =================================================

          {
            path: 'validation',

            loadComponent: () =>
              import('./pages/deces/validation/validation')
                .then(m => m.Validation)
          },


          // =================================================
          // DOCUMENTS ADMINISTRATIFS
          // =================================================

          {
            path: 'documents',

            loadComponent: () =>
              import('./pages/deces/documents/documents')
                .then(m => m.Documents)
          },


          // =================================================
          // RECHERCHE
          // =================================================

          {
            path: 'recherche',

            loadComponent: () =>
              import('./pages/deces/recherche/recherche')
                .then(m => m.Recherche)
          },


          // =================================================
          // HISTORIQUE
          // =================================================

          {
            path: 'historique',

            loadComponent: () =>
              import('./pages/deces/historique/historique')
                .then(m => m.Historique)
          }

        ]
      },


      // =====================================================
      // ASSURANCE
      // =====================================================

      {
        path: 'assurance',

        canActivate: [sectionGuard],

        data: {
          section: 'ASSURANCE'
        },

        loadComponent: () =>
          import('./pages/assurance/assurance')
            .then(m => m.Assurance)
      },


      // =====================================================
      // CULTURE
      // =====================================================

      {
        path: 'culture',

        canActivate: [sectionGuard],

        data: {
          section: 'CULTURE'
        },

        loadComponent: () =>
          import('./pages/culture/culture')
            .then(m => m.Culture)
      },


      // =====================================================
      // ADMINISTRATION
      // SUPER ADMIN UNIQUEMENT
      // =====================================================

      {
        path: 'admin',

        canActivate: [sectionGuard],

        data: {
          section: 'SUPER_ADMIN'
        },

        loadComponent: () =>
          import('./pages/admin/admin')
            .then(m => m.Admin)
      }

    ]
  },

  // =========================================================
  // URL VIDE
  // =========================================================

  {
    path: '',

    redirectTo: '/home',

    pathMatch: 'full'
  },


  // =========================================================
  // URL INCONNUE
  // =========================================================

  {
    path: '**',

    redirectTo: '/home'
  }

];