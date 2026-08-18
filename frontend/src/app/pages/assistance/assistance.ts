import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-assistance',
    standalone: true,

  imports: [RouterLink],
  templateUrl: './assistance.html',
  styleUrl: './assistance.css',
})
export class Assistance {}
