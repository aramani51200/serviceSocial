import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-culture',
    standalone: true,

  imports: [RouterLink],
  templateUrl: './culture.html',
  styleUrl: './culture.css',
})
export class Culture {}
