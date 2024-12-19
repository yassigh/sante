import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  constructor(private router: Router) {}

  // Méthode pour naviguer vers une autre route
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]); // Navigation dynamique
  }
  logout() {
    // Clear user session or token here (if applicable)
    // Redirect to the login page after logout
    this.router.navigate(['/login']);
  }
}
