import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  AdherentService,
  Adherent,
  AdherentPage,
  AdherentStatistics
} from '../../core/services/adherent.service';

@Component({
  selector: 'app-adherents',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './adherents.html',
  styleUrl: './adherents.css'
})
export class Adherents implements OnInit {

  // =====================================================
  // DATA
  // =====================================================

  adherents: Adherent[] = [];

  selectedAdherent: Adherent | null = null;

  adherentToDelete: Adherent | null = null;

  editingAdherent: Adherent | null = null;


  // =====================================================
  // SEARCH / FILTERS
  // =====================================================

  searchTerm = '';

  selectedCategorie = '';

  selectedSituation = '';
  testChanges = 'test changes';


  // =====================================================
  // PAGINATION
  // =====================================================

  currentPage = 0;

  pageSize = 5;

  totalElements = 0;

  totalPages = 0;


  // =====================================================
  // STATISTICS
  // =====================================================

  statistics: AdherentStatistics = {
    total: 0,
    actifs: 0,
    retraites: 0,
    pensionnes: 0
  };


  // =====================================================
  // LOADING
  // =====================================================

  loading = false;

  loadingStatistics = false;


  // =====================================================
  // MESSAGES
  // =====================================================

  errorMessage = '';

  successMessage = '';


  // =====================================================
  // MODALS
  // =====================================================

  // showForm = false;

  private _showForm = false;

get showForm(): boolean {
  return this._showForm;
}

set showForm(value: boolean) {
  console.log(
    '%c SHOW FORM CHANGED',
    'color: blue; font-weight: bold;',
    'OLD =',
    this._showForm,
    'NEW =',
    value
  );

  console.trace();

  this._showForm = value;
}

  showDetails = false;

  showDeleteConfirmation = false;


  // =====================================================
  // FORM
  // =====================================================

  form: Adherent = this.emptyAdherent();


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

constructor(
  private readonly adherentService: AdherentService,
  private readonly cdr: ChangeDetectorRef
) {}

  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadAdherents();

    this.loadStatistics();

  }


  // =====================================================
  // EMPTY MODEL
  // =====================================================

  emptyAdherent(): Adherent {

    return {

      id: 0,

      prenomAr: '',
      nomAr: '',

      categorie: '',
      grade: '',

      matriculeBR: '',
      matricule: '',

      dateNaissance: '',
      lieuNaissance: '',

      dateRadiation: null,
      motifRadiation: null,

      dateDeces: null,
      causeDeces: null,

      dernierUnite: '',
      formationUnite: '',

      telephone1: '',
      telephone2: '',

      adresse: '',
      email: '',

      situationCategorie: 'Actif',

      pension: false,

      cin: ''
    };
  }


  // =====================================================
  // LOAD ADHERENTS
  // =====================================================

//   loadAdherents(): void {
    

//     if (this.loading) {
//       return;
//     }

//     this.loading = true;

//     this.errorMessage = '';

//     this.adherentService.getAll(

//       this.searchTerm,

//       this.selectedCategorie,

//       this.selectedSituation,

//       this.currentPage,

//       this.pageSize

//     ).subscribe({

//       next: (response: AdherentPage) => {
// console.log('Adherents response:', response.content);
//         this.adherents =
//           response.content ?? [];

//         this.totalElements =
//           response.totalElements ?? 0;

//         this.totalPages =
//           response.totalPages ?? 0;

//         this.currentPage =
//           response.number ?? 0;

//         this.loading = false;


//       },

//       error: (error) => {

//         console.error(
//           'Erreur chargement adhérents :',
//           error
//         );

//         this.adherents = [];

//         this.totalElements = 0;

//         this.totalPages = 0;

//         this.loading = false;

//         this.errorMessage =
//           this.getErrorMessage(
//             error,
//             'Impossible de charger les adhérents.'
//           );
//       }

//     });
//     console.log('Adherents loaded:', this.adherents);
//   }
loadAdherents(): void {

  console.log('loadAdherents()');

  this.loading = true;
  this.errorMessage = '';

  this.adherentService.getAll(
    this.searchTerm,
    this.selectedCategorie,
    this.selectedSituation,
    this.currentPage,
    this.pageSize
  ).subscribe({

    next: (response: AdherentPage) => {

      console.log(
        'NEW RESPONSE:',
        response.content
      );

      this.adherents = [
        ...(response.content ?? [])
      ];

      this.totalElements =
        response.totalElements ?? 0;

      this.totalPages =
        response.totalPages ?? 0;

      this.currentPage =
        response.number ?? 0;

      this.loading = false;

      console.log(
        'TABLE DATA:',
        this.adherents
      );

      this.cdr.detectChanges();
    },

    error: (error) => {

      console.error(
        'Erreur chargement adhérents:',
        error
      );

      this.adherents = [];

      this.totalElements = 0;
      this.totalPages = 0;

      this.loading = false;

      this.errorMessage =
        this.getErrorMessage(
          error,
          'Impossible de charger les adhérents.'
        );

      this.cdr.detectChanges();
    }

  });
}

  // =====================================================
  // LOAD STATISTICS
  // =====================================================

  loadStatistics(): void {

    this.loadingStatistics = true;

    this.adherentService
      .getStatistics()
      .subscribe({

        next: (response: AdherentStatistics) => {

          this.statistics = {

            total: response.total ?? 0,

            actifs: response.actifs ?? 0,

            retraites: response.retraites ?? 0,

            pensionnes: response.pensionnes ?? 0

          };

          this.loadingStatistics = false;
        },

        error: (error) => {

          console.error(
            'Erreur statistiques :',
            error
          );

          this.loadingStatistics = false;

        }

      });
  }


  // =====================================================
  // SEARCH
  // =====================================================

  onSearch(): void {

    this.currentPage = 0;

    this.loadAdherents();

  }


  // =====================================================
  // RESET
  // =====================================================

  resetFilters(): void {

    this.searchTerm = '';

    this.selectedCategorie = '';

    this.selectedSituation = '';

    this.currentPage = 0;

    this.loadAdherents();

  }


  // =====================================================
  // PAGINATION
  // =====================================================

  changePage(page: number): void {

    if (this.loading) {
      return;
    }

    if (page < 0) {
      return;
    }

    if (page >= this.totalPages) {
      return;
    }

    this.currentPage = page;

    this.loadAdherents();

  }


  // =====================================================
  // PAGES
  // =====================================================

  get pages(): number[] {

    if (this.totalPages <= 0) {
      return [];
    }

    const maxPages = 7;

    let start =
      Math.max(
        0,
        this.currentPage - 3
      );

    let end =
      Math.min(
        this.totalPages,
        start + maxPages
      );

    if (end - start < maxPages) {

      start =
        Math.max(
          0,
          end - maxPages
        );
    }

    return Array.from(
      {
        length: end - start
      },
      (_, index) =>
        start + index
    );
  }


  // =====================================================
  // STATISTICS GETTERS
  // =====================================================

  get totalAdherents(): number {

    return this.statistics.total;

  }

  get actifs(): number {

    return this.statistics.actifs;

  }

  get retraites(): number {

    return this.statistics.retraites;

  }

  get pensionnes(): number {

    return this.statistics.pensionnes;

  }


  // =====================================================
  // ADD
  // =====================================================

  openAddForm(): void {

    this.editingAdherent = null;

    this.form =
      this.emptyAdherent();

    this.errorMessage = '';

    this.successMessage = '';

    this.showForm = true;

  }


  // =====================================================
  // EDIT
  // =====================================================

  openEditForm(adherent: Adherent): void {

    this.editingAdherent = adherent;

    this.form = {
      ...adherent
    };

    this.errorMessage = '';

    this.successMessage = '';

    this.showForm = true;

  }


  // =====================================================
  // SAVE
  // =====================================================

  saveAdherent(): void {

  if (this.loading) {
    return;
  }

  this.errorMessage = '';
  this.successMessage = '';

  const validationError = this.validateForm();

  if (validationError) {
    this.errorMessage = validationError;
    return;
  }

  this.loading = true;

  // =====================================================
  // UPDATE
  // =====================================================

  if (this.editingAdherent) {

    const id = this.editingAdherent.id;

    this.adherentService.update(id, this.form).subscribe({

      next: (updatedAdherent: Adherent) => {

        console.log('UPDATE RESPONSE:', updatedAdherent);

        /*
         * Mise à jour immédiate de la ligne dans le tableau.
         */
        const index = this.adherents.findIndex(
          a => a.id === id
        );

        if (index !== -1) {

          this.adherents[index] = {
            ...updatedAdherent
          };

          /*
           * Nouvelle référence du tableau
           * pour forcer Angular à voir le changement.
           */
          this.adherents = [
            ...this.adherents
          ];
        }

        this.loading = false;

        this.closeForm();

        this.successMessage =
          'Adhérent modifié avec succès.';

        /*
         * Recharge depuis Spring Boot pour avoir
         * exactement les données de la DB.
         */
        this.loadAdherents();
        this.loadStatistics();

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.error(
          'Erreur modification :',
          error
        );

        this.loading = false;

        this.errorMessage =
          this.getErrorMessage(
            error,
            'Erreur lors de la modification.'
          );

        this.cdr.detectChanges();
      }

    });

    return;
  }


  // =====================================================
  // CREATE
  // =====================================================

  this.adherentService.create(this.form).subscribe({

    next: (createdAdherent: Adherent) => {

      console.log(
        'CREATE RESPONSE:',
        createdAdherent
      );

      /*
       * Ajouter immédiatement le nouvel adhérent
       * dans le tableau.
       */
      this.adherents = [
        createdAdherent,
        ...this.adherents
      ];

      this.totalElements =
        this.totalElements + 1;

      this.loading = false;

      this.closeForm();

      this.successMessage =
        'Adhérent ajouté avec succès.';

      /*
       * Revenir à la première page.
       */
      this.currentPage = 0;

      /*
       * Recharger depuis le backend.
       */
      this.loadAdherents();
      this.loadStatistics();

      this.cdr.detectChanges();

    },

    error: (error) => {

      console.error(
        'Erreur création :',
        error
      );

      this.loading = false;

      this.errorMessage =
        this.getErrorMessage(
          error,
          'Erreur lors de la création.'
        );

      this.cdr.detectChanges();
    }

  });
}

  // =====================================================
  // FORM VALIDATION
  // =====================================================

  private validateForm(): string | null {

    if (!this.form.prenomAr?.trim()) {

      return 'Le prénom arabe est obligatoire.';
    }

    if (!this.form.nomAr?.trim()) {

      return 'Le nom arabe est obligatoire.';
    }

    if (!this.form.cin?.trim()) {

      return 'Le CIN est obligatoire.';
    }

    if (!this.form.dateNaissance) {

      return 'La date de naissance est obligatoire.';
    }

    if (!this.form.lieuNaissance?.trim()) {

      return 'Le lieu de naissance est obligatoire.';
    }

    if (!this.form.categorie?.trim()) {

      return 'La catégorie est obligatoire.';
    }

    if (!this.form.grade?.trim()) {

      return 'Le grade est obligatoire.';
    }

    if (!this.form.matriculeBR?.trim()) {

      return 'Le matricule BR est obligatoire.';
    }

    if (!this.form.matricule?.trim()) {

      return 'Le matricule est obligatoire.';
    }

    if (!this.form.dernierUnite?.trim()) {

      return 'La dernière unité est obligatoire.';
    }

    if (!this.form.formationUnite?.trim()) {

      return 'La formation / unité est obligatoire.';
    }

    if (!this.form.telephone1?.trim()) {

      return 'Le GSM 1 est obligatoire.';
    }

    if (!this.form.adresse?.trim()) {

      return 'L’adresse est obligatoire.';
    }

    if (!this.form.email?.trim()) {

      return 'L’email est obligatoire.';
    }

    if (!this.form.situationCategorie?.trim()) {

      return 'La situation est obligatoire.';
    }

    return null;
  }


  // =====================================================
  // ERROR MESSAGE
  // =====================================================

  private getErrorMessage(
    error: any,
    defaultMessage: string
  ): string {

    if (error?.status === 0) {

      return 'Impossible de contacter le serveur. Vérifiez que Spring Boot est démarré sur le port 8081.';
    }

    if (error?.status === 400) {

      return (
        error?.error?.message ||
        'Les données envoyées sont invalides.'
      );
    }

    if (error?.status === 401) {

      return 'Votre session a expiré. Veuillez vous reconnecter.';
    }

    if (error?.status === 403) {

      return 'Vous n’avez pas l’autorisation d’effectuer cette opération.';
    }

    if (error?.status === 404) {

      return 'Adhérent introuvable.';
    }

    if (error?.status === 409) {

      return (
        error?.error?.message ||
        'Le matricule ou le CIN existe déjà.'
      );
    }

    if (error?.error?.message) {

      return error.error.message;
    }

    return defaultMessage;
  }


  // =====================================================
  // DETAILS
  // =====================================================

  openDetails(
    adherent: Adherent
  ): void {

    this.selectedAdherent =
      adherent;

    this.showDetails = true;

  }


  // =====================================================
  // CLOSE DETAILS
  // =====================================================

  closeDetails(): void {

    this.showDetails = false;

    this.selectedAdherent = null;

  }


  // =====================================================
  // DELETE CONFIRMATION
  // =====================================================

  confirmDelete(
    adherent: Adherent
  ): void {

    this.adherentToDelete =
      adherent;

    this.showDeleteConfirmation =
      true;

  }


  // =====================================================
  // DELETE
  // =====================================================

  deleteAdherent(): void {

    if (
      !this.adherentToDelete ||
      this.loading
    ) {

      return;
    }


    const id =
      this.adherentToDelete.id;


    this.loading = true;


    this.adherentService
      .delete(id)
      .subscribe({

        next: () => {

          this.loading = false;

          this.showDeleteConfirmation =
            false;

          this.adherentToDelete = null;

          this.successMessage =
            'Adhérent supprimé avec succès.';

          // Si on supprime le dernier élément
          // de la page actuelle
          if (
            this.adherents.length === 1 &&
            this.currentPage > 0
          ) {

            this.currentPage--;

          }

          this.loadAdherents();

          this.loadStatistics();

        },

        error: (error) => {

          console.error(
            'Erreur suppression :',
            error
          );

          this.loading = false;

          this.errorMessage =
            this.getErrorMessage(
              error,
              'Erreur lors de la suppression.'
            );

        }

      });

  }


  // =====================================================
  // CLOSE DELETE
  // =====================================================

  closeDelete(): void {

    if (this.loading) {
      return;
    }

    this.showDeleteConfirmation =
      false;

    this.adherentToDelete =
      null;

  }


  // =====================================================
  // CLOSE FORM
  // =====================================================

  closeForm(): void {

  console.log('Closing form');

  this.showForm = false;
  this.editingAdherent = null;
  this.form = this.emptyAdherent();

}
  // =====================================================
  // REFRESH
  // =====================================================

  refresh(): void {

    if (this.loading) {
      return;
    }

    this.loadAdherents();

    this.loadStatistics();

  }


  // =====================================================
  // TRACK BY
  // =====================================================

  trackById(
    index: number,
    adherent: Adherent
  ): number {

    return adherent.id;

  }
}