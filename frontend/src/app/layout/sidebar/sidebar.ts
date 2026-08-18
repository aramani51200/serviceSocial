import { Component } from '@angular/core';
import {
RouterLink,
RouterLinkActive
} from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';

@Component({
selector: 'app-sidebar',
standalone: true,

imports: [
RouterLink,
RouterLinkActive
],

templateUrl: './sidebar.html',
styleUrl: './sidebar.css'
})
export class Sidebar {

constructor(
public authService: AuthService
) {}

get section(): string | null {
return this.authService.getUserSection();
}

isSuperAdmin(): boolean {
return this.section === 'SUPER_ADMIN';
}

isSection(section: string): boolean {
return this.section === section;
}
}
