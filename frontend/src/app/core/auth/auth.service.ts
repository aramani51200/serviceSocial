import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  token: string;
  id: number;
  username: string;
  role: string;
  section: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  // =========================================================
  // BROWSER CHECK
  // =========================================================

  private isBrowser(): boolean {
    return typeof window !== 'undefined' &&
           typeof localStorage !== 'undefined';
  }

  // =========================================================
  // LOGIN
  // =========================================================

  login(
    username: string,
    password: string
  ): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.apiUrl}/login`,
        {
          username,
          password
        }
      )
      .pipe(

        tap(response => {

          if (!this.isBrowser()) {
            return;
          }

          localStorage.setItem(
            'token',
            response.token
          );

          localStorage.setItem(
            'isLoggedIn',
            'true'
          );

          localStorage.setItem(
            'section',
            response.section
          );

          localStorage.setItem(
            'username',
            response.username
          );

          localStorage.setItem(
            'role',
            response.role
          );

        })

      );
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  logout(): void {

    if (!this.isBrowser()) {
      return;
    }

    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('section');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  // =========================================================
  // TOKEN
  // =========================================================

  getToken(): string | null {

    if (!this.isBrowser()) {
      return null;
    }

    return localStorage.getItem('token');
  }

  // =========================================================
  // AUTHENTICATION
  // =========================================================

  isLoggedIn(): boolean {

    if (!this.isBrowser()) {
      return false;
    }

    return !!localStorage.getItem('token');
  }

  // =========================================================
  // USERNAME
  // =========================================================

  getUsername(): string | null {

    if (!this.isBrowser()) {
      return null;
    }

    return localStorage.getItem('username');
  }

  // =========================================================
  // ROLE
  // =========================================================

  getRole(): string | null {

    if (!this.isBrowser()) {
      return null;
    }

    return localStorage.getItem('role');
  }

  // =========================================================
  // SECTION
  // =========================================================

  getUserSection(): string | null {

    if (!this.isBrowser()) {
      return null;
    }

    return localStorage.getItem('section');
  }

  // =========================================================
  // SUPER ADMIN
  // =========================================================

  isSuperAdmin(): boolean {

    return this.getUserSection() === 'SUPER_ADMIN';
  }

  // =========================================================
  // SECTION ACCESS
  // =========================================================

  hasSection(requiredSection: string): boolean {

    const currentSection =
      this.getUserSection();

    // SUPER ADMIN peut accéder à toutes les sections
    if (currentSection === 'SUPER_ADMIN') {
      return true;
    }

    // Un utilisateur normal peut uniquement
    // accéder à sa propre section
    return currentSection === requiredSection;
  }
}