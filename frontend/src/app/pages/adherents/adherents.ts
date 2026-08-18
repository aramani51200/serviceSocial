import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  takeUntil
} from 'rxjs';

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
export class Adherents implements OnInit, OnDestroy {

  // =====================================================
  // DATA
  // =====================================================

  adherents: Adherent[] = [];

  selectedAdherent: Adherent | null = null;

  adherentToDelete: Adherent | null = null;

  editingAdherent: Adherent | null = null;


  // =====================================================
  // SEARCH
  // =====================================================

  searchTerm = '';

  selectedCategorie = '';

  selectedSituation = '';


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
  // LOADING / ERROR
  // =====================================================

  loading = false;

  errorMessage = '';

  successMessage = '';


  // =====================================================
  // MODALS
  // =====================================================

  showForm = false;

  showDetails = false;

  showDeleteConfirmation = false;


  // =====================================================
  // FORM
  // =====================================================

  form: Adherent = this.emptyAdherent();


  // =====================================================
  // RXJS
  // =====================================================

  private searchSubject =
    new Subject<string>();

  private destroy$ =
    new Subject<void>();


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(
    private adherentService: AdherentService
  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    // ---------------------------------------------------
    // Recherche avec délai de 500 ms
    // ---------------------------------------------------

    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {

        this.currentPage = 0;

        this.loadAdherents();

      });


    // ---------------------------------------------------
    // Chargement initial
    // ---------------------------------------------------

    this.loadAdherents();

    this.loadStatistics();

  }


  // =====================================================
  // DESTROY
  // =====================================================

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

    this.searchSubject.complete();

  }


  // =====================================================
  // EMPTY ADHERENT
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

  loadAdherents(): void {

    // ---------------------------------------------------
    // Évite plusieurs requêtes simultanées
    // ---------------------------------------------------

    if (this.loading) {

      return;

    }


    this.loading = true;

    this.errorMessage = '';


    this.adherentService
      .getAll(

        this.searchTerm,

        this.selectedCategorie,

        this.selectedSituation,

        this.currentPage,

        this.pageSize

      )
      .subscribe({

        next: (response: AdherentPage) => {

          console.log(
            'Adhérents reçus :',
            response
          );


          this.adherents =
            response.content ?? [];


          this.totalElements =
            response.totalElements ?? 0;


          this.totalPages =
            response.totalPages ?? 0;


          this.currentPage =
            response.number ?? 0;


          this.loading = false;

        },


        error: (error) => {

          console.error(
            'Erreur chargement adhérents :',
            error
          );


          this.adherents = [];

          this.totalElements = 0;

          this.totalPages = 0;

          this.loading = false;


          this.errorMessage =
            'Impossible de charger les adhérents.';

        }

      });

  }


  // =====================================================
  // LOAD STATISTICS
  // =====================================================

  loadStatistics(): void {

    this.adherentService
      .getStatistics()
      .subscribe({

        next: (
          response: AdherentStatistics
        ) => {

          this.statistics = response;

        },

        error: (error) => {

          console.error(
            'Erreur statistiques :',
            error
          );

        }

      });

  }


  // =====================================================
  // SEARCH
  // =====================================================

  onSearch(): void {

    this.searchSubject.next(
      this.searchTerm.trim()
    );

  }


  // =====================================================
  // FILTER CATEGORIE
  // =====================================================

  onCategorieChange(): void {

    this.currentPage = 0;

    this.loadAdherents();

  }


  // =====================================================
  // FILTER SITUATION
  // =====================================================

  onSituationChange(): void {

    this.currentPage = 0;

    this.loadAdherents();

  }


  // =====================================================
  // RESET FILTERS
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


    if (
      page < 0 ||
      page >= this.totalPages
    ) {

      return;

    }


    if (page === this.currentPage) {

      return;

    }


    this.currentPage = page;

    this.loadAdherents();

  }


  // =====================================================
  // PAGES
  // =====================================================

  get pages(): number[] {

    return Array.from(
      {
        length: this.totalPages
      },
      (_, index) => index
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
  // ADD FORM
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
  // EDIT FORM
  // =====================================================

  openEditForm(
    adherent: Adherent
  ): void {

    this.editingAdherent =
      adherent;

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

    this.errorMessage = '';

    this.successMessage = '';


    // ===================================================
    // VALIDATION
    // ===================================================

    if (!this.form.prenomAr?.trim()) {

      this.errorMessage =
        'Le prénom arabe est obligatoire.';

      return;

    }


    if (!this.form.nomAr?.trim()) {

      this.errorMessage =
        'Le nom arabe est obligatoire.';

      return;

    }


    if (!this.form.cin?.trim()) {

      this.errorMessage =
        'Le CIN est obligatoire.';

      return;

    }


    if (!this.form.matricule?.trim()) {

      this.errorMessage =
        'Le matricule est obligatoire.';

      return;

    }


    if (!this.form.dateNaissance) {

      this.errorMessage =
        'La date de naissance est obligatoire.';

      return;

    }


    if (!this.form.lieuNaissance?.trim()) {

      this.errorMessage =
        'Le lieu de naissance est obligatoire.';

      return;

    }


    if (!this.form.categorie?.trim()) {

      this.errorMessage =
        'La catégorie est obligatoire.';

      return;

    }


    if (!this.form.grade?.trim()) {

      this.errorMessage =
        'Le grade est obligatoire.';

      return;

    }


    if (!this.form.matriculeBR?.trim()) {

      this.errorMessage =
        'Le matricule BR est obligatoire.';

      return;

    }


    if (!this.form.dernierUnite?.trim()) {

      this.errorMessage =
        'La dernière unité est obligatoire.';

      return;

    }


    if (!this.form.formationUnite?.trim()) {

      this.errorMessage =
        'La formation / unité est obligatoire.';

      return;

    }


    if (!this.form.telephone1?.trim()) {

      this.errorMessage =
        'Le GSM 1 est obligatoire.';

      return;

    }


    if (!this.form.adresse?.trim()) {

      this.errorMessage =
        'L’adresse est obligatoire.';

      return;

    }


    if (!this.form.email?.trim()) {

      this.errorMessage =
        'L’email est obligatoire.';

      return;

    }


    if (!this.form.situationCategorie?.trim()) {

      this.errorMessage =
        'La situation est obligatoire.';

      return;

    }


    // ===================================================
    // UPDATE
    // ===================================================

    if (this.editingAdherent) {

      const id =
        this.editingAdherent.id;


      this.loading = true;


      this.adherentService
        .update(
          id,
          this.form
        )
        .subscribe({

          next: (
            response
          ) => {

            console.log(
              'Adhérent modifié :',
              response
            );


            this.loading = false;

            this.closeForm();


            this.successMessage =
              'Adhérent modifié avec succès.';


            this.loadAdherents();

            this.loadStatistics();

          },


          error: (error) => {

            console.error(
              'Erreur modification :',
              error
            );


            this.loading = false;

            this.handleBackendError(
              error
            );

          }

        });


      return;

    }


    // ===================================================
    // CREATE
    // ===================================================

    this.loading = true;


    this.adherentService
      .create(this.form)
      .subscribe({

        next: (
          response
        ) => {

          console.log(
            'Adhérent créé :',
            response
          );


          this.loading = false;

          this.closeForm();


          this.successMessage =
            'Adhérent ajouté avec succès.';


          this.currentPage = 0;


          this.loadAdherents();

          this.loadStatistics();

        },


        error: (error) => {

          console.error(
            'Erreur création :',
            error
          );


          this.loading = false;

          this.handleBackendError(
            error
          );

        }

      });

  }


  // =====================================================
  // BACKEND ERROR
  // =====================================================

  private handleBackendError(
    error: any
  ): void {

    console.error(
      'Backend error:',
      error
    );


    if (error?.status === 409) {

      this.errorMessage =
        error?.error?.message ??
        'Le matricule ou le CIN existe déjà.';

      return;

    }


    if (error?.status === 400) {

      this.errorMessage =
        error?.error?.message ??
        'Les données saisies sont invalides.';

      return;

    }


    if (error?.status === 401) {

      this.errorMessage =
        'Session expirée. Veuillez vous reconnecter.';

      return;

    }


    if (error?.status === 403) {

      this.errorMessage =
        'Vous n’avez pas l’autorisation.';

      return;

    }


    if (error?.status === 404) {

      this.errorMessage =
        'Adhérent introuvable.';

      return;

    }


    if (error?.status === 500) {

      this.errorMessage =
        'Erreur interne du serveur.';

      return;

    }


    this.errorMessage =
      'Une erreur est survenue lors de l’opération.';

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

    if (!this.adherentToDelete) {

      return;

    }


    const id =
      this.adherentToDelete.id;


    this.loading = true;


    this.adherentService
      .delete(id)
      .subscribe({

        next: () => {

          console.log(
            'Adhérent supprimé'
          );


          this.loading = false;


          this.showDeleteConfirmation =
            false;


          this.adherentToDelete =
            null;


          this.successMessage =
            'Adhérent supprimé avec succès.';


          // Si la dernière ligne de la page
          // vient d'être supprimée
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

          this.handleBackendError(
            error
          );

        }

      });

  }


  // =====================================================
  // CLOSE DELETE
  // =====================================================

  closeDelete(): void {

    this.showDeleteConfirmation =
      false;

    this.adherentToDelete =
      null;

  }


  // =====================================================
  // CLOSE FORM
  // =====================================================

  closeForm(): void {

    this.showForm = false;

    this.editingAdherent = null;

    this.form =
      this.emptyAdherent();

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