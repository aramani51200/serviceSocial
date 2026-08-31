import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { DossierService } from '../../../core/services/dossier.service';

import {
  Dossier as ApiDossier,
  DossierPage,
  DossierStatut
} from '../../../core/models/dossier.model';


// =====================================================
// VIEW MODEL
// =====================================================

interface DossierDeces {

  id: number;

  numero: string;

  adherent: string;

  matricule: string;

  dateDeces: string;

  lieuDeces: string;

  natureDeces: string;

  statut: string;

}


// =====================================================
// STATUT LABELS
// =====================================================

const STATUT_LABELS: Record<DossierStatut, string> = {

  A_VALIDER: 'À valider',

  EN_COURS: 'En cours',

  INCOMPLET: 'Incomplet',

  VALIDE: 'Validé',

  CLOTURE: 'Clôturé'

};


// =====================================================
// COMPONENT
// =====================================================

@Component({

  selector: 'app-dossiers',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './dossiers.html',

  styleUrl: './dossiers.css'

})
export class Dossiers implements OnInit {


  // =====================================================
  // SEARCH
  // =====================================================

  searchTerm = '';

  selectedStatut = 'Tous';


  // =====================================================
  // DATA
  // =====================================================

  dossiers: DossierDeces[] = [];


  // =====================================================
  // PAGINATION
  // =====================================================

  currentPage = 0;

  pageSize = 10;

  totalElements = 0;

  totalPages = 0;


  // =====================================================
  // STATE
  // =====================================================

  loading = false;

  errorMessage = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private readonly dossierService: DossierService
  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.chargerDossiers();

  }


  // =====================================================
  // CHARGER DOSSIERS
  // =====================================================

chargerDossiers(): void {

  this.loading = true;
  this.errorMessage = '';

  this.dossierService
    .list('DECES', undefined, undefined, 0, 100)
    .subscribe({

      next: (page: DossierPage) => {

        console.log('DOSSIERS RESPONSE:', page);

        this.dossiers =
          page.content.map(d => this.toViewModel(d));

        console.log(
          'DOSSIERS MAPPÉS:',
          this.dossiers
        );

        this.loading = false;
      },

      error: (error) => {

        console.error(
          'ERREUR CHARGEMENT DOSSIERS:',
          error
        );

        console.log(
          'STATUS:',
          error.status
        );

        console.log(
          'BODY:',
          error.error
        );

        this.loading = false;

        if (error.status === 403) {

          this.errorMessage =
            'Vous n’avez pas l’autorisation de consulter les dossiers.';

        } else if (error.status === 401) {

          this.errorMessage =
            'Votre session a expiré. Veuillez vous reconnecter.';

        } else {

          this.errorMessage =
            'Impossible de charger les dossiers.';

        }
      }

    });
}

  // =====================================================
  // API → VIEW MODEL
  // =====================================================

  private toViewModel(
    d: ApiDossier
  ): DossierDeces {

    return {

      id:
        d.id,

      numero:
        d.numero ?? '',

      adherent:
        d.adherentNom ?? '',

      matricule:
        d.matricule ?? '',

      dateDeces:
        d.dateEvenement ?? '',

      lieuDeces:
        d.lieu ?? '',

      natureDeces:
        d.nature ?? '',

      statut:
        STATUT_LABELS[d.statut]
        ?? d.statut
        ?? ''

    };

  }


  // =====================================================
  // FILTERED DOSSIERS
  // =====================================================

  get filteredDossiers(): DossierDeces[] {

    const search =
      this.searchTerm
        .toLowerCase()
        .trim();


    return this.dossiers.filter(
      (dossier) => {


        // -----------------------------------------------
        // SEARCH
        // -----------------------------------------------

        const matchesSearch =

          dossier.numero
            .toLowerCase()
            .includes(search)

          ||

          dossier.adherent
            .toLowerCase()
            .includes(search)

          ||

          dossier.matricule
            .toLowerCase()
            .includes(search);


        // -----------------------------------------------
        // STATUS
        // -----------------------------------------------

        const matchesStatus =

          this.selectedStatut === 'Tous'

          ||

          dossier.statut ===
            this.selectedStatut;


        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );

  }


  // =====================================================
  // SEARCH RESET
  // =====================================================

  resetFilters(): void {

    this.searchTerm = '';

    this.selectedStatut = 'Tous';

  }


  // =====================================================
  // REFRESH
  // =====================================================

  refresh(): void {

    if (this.loading) {

      return;

    }

    this.chargerDossiers();

  }


  // =====================================================
  // PAGINATION
  // =====================================================

  changePage(
    page: number
  ): void {

    if (this.loading) {

      return;

    }


    if (page < 0) {

      return;

    }


    if (
      this.totalPages > 0 &&
      page >= this.totalPages
    ) {

      return;

    }


    this.currentPage = page;

    this.chargerDossiers();

  }


  // =====================================================
  // PAGES
  // =====================================================

  get pages(): number[] {

    if (this.totalPages <= 0) {

      return [];

    }


    return Array.from(
      {
        length: this.totalPages
      },
      (_, index) => index
    );

  }


  // =====================================================
  // NOUVEAU DOSSIER
  // =====================================================

  nouveauDossier(): void {

    console.log(
      'Nouveau dossier'
    );

  }


  // =====================================================
  // VOIR DOSSIER
  // =====================================================

  voirDossier(
    dossier: DossierDeces
  ): void {

    console.log(
      'Dossier sélectionné:',
      dossier
    );


    alert(

      `Dossier ${dossier.numero}\n\n` +

      `Adhérent : ${dossier.adherent}\n` +

      `Matricule : ${dossier.matricule}\n` +

      `Date décès : ${dossier.dateDeces}\n` +

      `Lieu : ${dossier.lieuDeces}\n` +

      `Nature : ${dossier.natureDeces}\n` +

      `Statut : ${dossier.statut}`

    );

  }


  // =====================================================
  // MODIFIER DOSSIER
  // =====================================================

  modifierDossier(
    dossier: DossierDeces
  ): void {

    console.log(
      'Modifier dossier:',
      dossier
    );


    alert(
      `Modification du dossier ${dossier.numero}`
    );

  }


  // =====================================================
  // STATUS CLASS
  // =====================================================

  getStatusClass(
    statut: string
  ): string {

    switch (statut) {

      case 'En cours':

        return 'status-progress';


      case 'Incomplet':

        return 'status-danger';


      case 'À valider':

        return 'status-warning';


      case 'Validé':

        return 'status-success';


      case 'Clôturé':

        return 'status-closed';


      default:

        return '';

    }

  }


  // =====================================================
  // ERROR MESSAGE
  // =====================================================

  private getErrorMessage(
    error: any
  ): string {

    if (error?.status === 0) {

      return 'Impossible de contacter le serveur. Vérifiez que Spring Boot est démarré.';

    }


    if (error?.status === 401) {

      return 'Votre session a expiré. Veuillez vous reconnecter.';

    }


    if (error?.status === 403) {

      return 'Vous n’avez pas l’autorisation de consulter les dossiers.';

    }


    if (error?.status === 404) {

      return 'Service ou endpoint des dossiers introuvable.';

    }


    if (error?.error?.message) {

      return error.error.message;

    }


    return 'Impossible de charger les dossiers.';

  }

}