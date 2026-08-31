import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Dossier, DossierPage, DossierRequest, DossierStatut } from '../models/dossier.model';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  private readonly apiUrl = `${environment.apiUrl}/sections`;

  constructor(private http: HttpClient) {}

  private baseUrl(section: string): string {
    return `${this.apiUrl}/${section}/dossiers`;
  }

  list(section: string, search?: string, statut?: DossierStatut, page = 0, size = 20): Observable<DossierPage> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (search) {
      params = params.set('search', search);
    }

    if (statut) {
      params = params.set('statut', statut);
    }

    return this.http.get<DossierPage>(`${this.baseUrl(section)}/all`, { params });
  }

  get(section: string, id: number): Observable<Dossier> {
    return this.http.get<Dossier>(`${this.baseUrl(section)}/${id}`);
  }
  getAll(section: string, id: number): Observable<Dossier> {
    return this.http.get<Dossier>(`${this.baseUrl(section)}/all`);
  }

  create(section: string, request: DossierRequest): Observable<Dossier> {
    return this.http.post<Dossier>(this.baseUrl(section), request);
  }

  update(section: string, id: number, request: DossierRequest): Observable<Dossier> {
    return this.http.put<Dossier>(`${this.baseUrl(section)}/${id}`, request);
  }

  delete(section: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl(section)}/${id}`);
  }
}
