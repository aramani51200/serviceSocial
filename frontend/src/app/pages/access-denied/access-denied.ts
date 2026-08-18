import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
selector: 'app-access-denied',
standalone: true,
templateUrl: './access-denied.html',
styleUrl: './access-denied.css'
})
export class AccessDenied {

constructor(private location: Location) {}

goBack(): void {
this.location.back();
}

}
