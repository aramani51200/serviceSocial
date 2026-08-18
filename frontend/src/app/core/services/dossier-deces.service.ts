import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { environment } from '../../../environments/environment'; 
//import { DossierDeces, DossierRequest } from '../models/deces.model';

//@Injectable({providedIn:'root'}) 
//export class DossierDecesService { 
  //private url=`${environment.apiUrl}/deces`; 
  //constructor(private http:HttpClient){} 
  //getAll():Observable<DossierDeces[]>{return this.http.get<DossierDeces[]>(this.url);} 
  //getById(id:number):Observable<DossierDeces>{return this.http.get<DossierDeces>(`${this.url}/${id}`);} 
  //create(value:DossierRequest):Observable<DossierDeces>{return this.http.post<DossierDeces>(this.url,value);} 
  //update(id:number,value:DossierRequest):Observable<DossierDeces>{return this.http.put<DossierDeces>(`${this.url}/${id}`,value);} 
  //delete(id:number):Observable<void>{return this.http.delete<void>(`${this.url}/${id}`);} }
