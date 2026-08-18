import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

const SECTION_ROUTES: Record<string, string> = {
  SUPER_ADMIN: '/dashboard',
  ADHERENTS: '/adherents',
  DECES: '/deces/dashboard',
  MUTUELLE: '/mutuelle',
  ASSISTANCE: '/assistance',
  ASSURANCE: '/assurance',
  RETRAITES: '/retraites',
  CULTURE: '/culture',
  BUREAU_ORDRE: '/bureau-ordre'
};

@Component({
selector: 'app-login',
standalone: true,

imports: [
CommonModule,
FormsModule,
RouterLink
],

templateUrl: './login.html',
styleUrl: './login.css'
})
export class Login {

username = '';
password = '';

showPassword = false;
errorMessage = '';
loading = false;

constructor(
private authService: AuthService,
private router: Router
) {}

login(): void {

  this.errorMessage = '';

  if (!this.username || !this.password) {
    this.errorMessage =
      'Veuillez remplir tous les champs.';
    return;
  }

  this.loading = true;

  this.authService.login(this.username, this.password).subscribe({

    next: (response) => {

      this.loading = false;

      const destination = SECTION_ROUTES[response.section] ?? '/home';

      this.router.navigate([destination]);

    },

    error: (err) => {

      this.loading = false;

      this.errorMessage =
        err?.error?.message ?? 'Nom d\u2019utilisateur ou mot de passe incorrect.';

    }

  });

}
}
