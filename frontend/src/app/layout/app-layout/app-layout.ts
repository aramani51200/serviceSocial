import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,

  imports: [
    RouterOutlet,
    Navbar,
    Sidebar,
    Footer
  ],

  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css'
})
export class AppLayout {

}