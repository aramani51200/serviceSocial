import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {

    // Supprimer la session
    this.authService.logout();

    // Retour vers login
    this.router.navigate(['/login']);

  }

}