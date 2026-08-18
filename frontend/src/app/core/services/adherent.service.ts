import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

// =====================================================
// ADHERENT MODEL
// =====================================================

export interface Adherent {

  id: number;

  prenomAr: string;
  nomAr: string;

  categorie: string;
  grade: string;

  matriculeBR: string;
  matricule: string;

  dateNaissance: string;
  lieuNaissance: string;

  dateRadiation: string | null;
  motifRadiation: string | null;

  dateDeces: string | null;
  causeDeces: string | null;

  dernierUnite: string;
  formationUnite: string;

  telephone1: string;
  telephone2: string;

  adresse: string;
  email: string;

  situationCategorie: string;

  pension: boolean;

  cin: string;
}


// =====================================================
// PAGINATION RESPONSE
// Spring Boot Page<T>
// =====================================================

export interface AdherentPage {

  content: Adherent[];

  totalElements: number;

  totalPages: number;

  size: number;

  number: number;

  numberOfElements: number;

  first: boolean;

  last: boolean;

  empty: boolean;

}


// =====================================================
// STATISTICS
// =====================================================

export interface AdherentStatistics {

  total: number;

  actifs: number;

  retraites: number;

  pensionnes: number;

}


// =====================================================
// SERVICE
// =====================================================

@Injectable({
  providedIn: 'root'
})
export class AdherentService {

  // ===================================================
  // API URL
  // ===================================================

  private readonly apiUrl =
    `${environment.apiUrl}/adherents`;


  // ===================================================
  // CONSTRUCTOR
  // ===================================================

  constructor(
    private http: HttpClient
  ) {}


  // ===================================================
  // GET ALL
  // ===================================================

  getAll(
    search: string = '',
    categorie: string = '',
    situation: string = '',
    page: number = 0,
    size: number = 5
  ): Observable<AdherentPage> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,desc');


    // -----------------------------------------------
    // SEARCH
    // -----------------------------------------------

    if (search && search.trim() !== '') {

      params = params.set(
        'search',
        search.trim()
      );

    }


    // -----------------------------------------------
    // CATEGORIE
    // -----------------------------------------------

    if (
      categorie &&
      categorie.trim() !== ''
    ) {

      params = params.set(
        'categorie',
        categorie.trim()
      );

    }


    // -----------------------------------------------
    // SITUATION
    // -----------------------------------------------

    if (
      situation &&
      situation.trim() !== ''
    ) {

      params = params.set(
        'situation',
        situation.trim()
      );

    }


    return this.http.get<AdherentPage>(
      this.apiUrl,
      { params }
    );

  }


  // ===================================================
  // GET BY ID
  // ===================================================

  getById(
    id: number
  ): Observable<Adherent> {

    return this.http.get<Adherent>(
      `${this.apiUrl}/${id}`
    );

  }


  // ===================================================
  // CREATE
  // ===================================================

  create(
    adherent: Adherent
  ): Observable<Adherent> {

    // -----------------------------------------------
    // On ne doit pas envoyer l'id pour une création
    // -----------------------------------------------

    const data = {

      prenomAr: adherent.prenomAr,

      nomAr: adherent.nomAr,

      categorie: adherent.categorie,

      grade: adherent.grade,

      matriculeBR: adherent.matriculeBR,

      matricule: adherent.matricule,

      dateNaissance: adherent.dateNaissance,

      lieuNaissance: adherent.lieuNaissance,

      dateRadiation:
        adherent.dateRadiation || null,

      motifRadiation:
        adherent.motifRadiation || null,

      dateDeces:
        adherent.dateDeces || null,

      causeDeces:
        adherent.causeDeces || null,

      dernierUnite:
        adherent.dernierUnite,

      formationUnite:
        adherent.formationUnite,

      telephone1:
        adherent.telephone1,

      telephone2:
        adherent.telephone2 || null,

      adresse:
        adherent.adresse,

      email:
        adherent.email,

      situationCategorie:
        adherent.situationCategorie,

      pension:
        adherent.pension,

      cin:
        adherent.cin

    };


    return this.http.post<Adherent>(
      this.apiUrl,
      data
    );

  }


  // ===================================================
  // UPDATE
  // ===================================================

  update(
    id: number,
    adherent: Adherent
  ): Observable<Adherent> {

    const data = {

      prenomAr: adherent.prenomAr,

      nomAr: adherent.nomAr,

      categorie: adherent.categorie,

      grade: adherent.grade,

      matriculeBR: adherent.matriculeBR,

      matricule: adherent.matricule,

      dateNaissance: adherent.dateNaissance,

      lieuNaissance: adherent.lieuNaissance,

      dateRadiation:
        adherent.dateRadiation || null,

      motifRadiation:
        adherent.motifRadiation || null,

      dateDeces:
        adherent.dateDeces || null,

      causeDeces:
        adherent.causeDeces || null,

      dernierUnite:
        adherent.dernierUnite,

      formationUnite:
        adherent.formationUnite,

      telephone1:
        adherent.telephone1,

      telephone2:
        adherent.telephone2 || null,

      adresse:
        adherent.adresse,

      email:
        adherent.email,

      situationCategorie:
        adherent.situationCategorie,

      pension:
        adherent.pension,

      cin:
        adherent.cin

    };


    return this.http.put<Adherent>(
      `${this.apiUrl}/${id}`,
      data
    );

  }


  // ===================================================
  // DELETE
  // ===================================================

  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );

  }


  // ===================================================
  // STATISTICS
  // ===================================================

  getStatistics():
    Observable<AdherentStatistics> {

    return this.http.get<AdherentStatistics>(
      `${this.apiUrl}/statistics`
    );

  }

}