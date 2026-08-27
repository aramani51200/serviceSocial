import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface DossierDecesCreate {

  adherentId: number;

  dateDeces: string;

  lieuDeces: string;

  natureDeces: string | null;

  causeDeces: string | null;

  dpr: string | null;

  observation: string | null;
}


export interface DossierDeces {

  id: number;

  numero: string;

  adherentId: number;

  nomComplet: string;

  dateDeces: string;

  lieuDeces: string;

  natureDeces: string | null;

  causeDeces: string | null;

  dpr: string | null;

  observation: string | null;

  statut: string;
}


@Injectable({
  providedIn: 'root'
})
export class DecesService {

  private readonly apiUrl =
    `${environment.apiUrl}/deces/dossiers`;


  constructor(
    private readonly http: HttpClient
  ) {}


  // ===================================================
  // CREATE
  // ===================================================

  create(
    dossier: DossierDecesCreate
  ): Observable<DossierDeces> {

    return this.http.post<DossierDeces>(
      this.apiUrl,
      dossier
    );
  }


  // ===================================================
  // GET ALL
  // ===================================================

  getAll(): Observable<DossierDeces[]> {

    return this.http.get<DossierDeces[]>(
      this.apiUrl
    );
  }


  // ===================================================
  // GET BY ID
  // ===================================================

  getById(
    id: number
  ): Observable<DossierDeces> {

    return this.http.get<DossierDeces>(
      `${this.apiUrl}/${id}`
    );
  }
}