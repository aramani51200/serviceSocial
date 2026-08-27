import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DossierDecesRequest {
  adherentId: number;
  nomComplet: string;
  dateDeces: string;
  lieuDeces: string;
  natureDeces: string;
  causeDeces: string;
  dpr: string;
  observation: string;
}

export interface DossierDeces {
  id: number;
  numero: string;
  adherentId: number;
  nomComplet: string;
  dateDeces: string;
  lieuDeces: string;
  natureDeces: string;
  causeDeces: string;
  dpr: string;
  observation: string;
  statut: string;
}

@Injectable({
  providedIn: 'root'
})
export class DossierDecesService {

  private readonly apiUrl =
    'http://localhost:8081/api/deces/dossiers';

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Créer un dossier décès
   */
  creer(
    dossier: DossierDecesRequest
  ): Observable<DossierDeces> {

    return this.http.post<DossierDeces>(
      this.apiUrl,
      dossier
    );
  }

  /**
   * Récupérer tous les dossiers
   */
  findAll(): Observable<DossierDeces[]> {

    return this.http.get<DossierDeces[]>(
      this.apiUrl
    );
  }

  /**
   * Récupérer un dossier par ID
   */
  findById(
    id: number
  ): Observable<DossierDeces> {

    return this.http.get<DossierDeces>(
      `${this.apiUrl}/${id}`
    );
  }

  /**
   * Dossiers d'un adhérent
   */
  findByAdherent(
    adherentId: number
  ): Observable<DossierDeces[]> {

    return this.http.get<DossierDeces[]>(
      `${this.apiUrl}/adherent/${adherentId}`
    );
  }

  /**
   * Modifier un dossier
   */
  modifier(
    id: number,
    dossier: DossierDecesRequest
  ): Observable<DossierDeces> {

    return this.http.put<DossierDeces>(
      `${this.apiUrl}/${id}`,
      dossier
    );
  }

  /**
   * Supprimer un dossier
   */
  supprimer(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}