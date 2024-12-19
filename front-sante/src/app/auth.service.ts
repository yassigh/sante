import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; 
  private tokenKey = 'authToken';
  private userKey = 'currentUser';  // Clé pour stocker l'utilisateur

  constructor(private http: HttpClient, private router: Router) {}

  // Save token to localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);  
    console.log('Token saved:', token);

    // Decode token to get user_id and save it in localStorage
    const decodedToken: any = jwtDecode(token);
    const userId = decodedToken.user_id;
    localStorage.setItem(this.userKey, JSON.stringify({ id: userId }));
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); 
  }

  decodeToken(token: string): any {
    if (!token) return null;
    const payload = token.split('.')[1]; // La deuxième partie du token est le payload
    const decodedPayload = atob(payload); // Décoder en base64
    return JSON.parse(decodedPayload); // Convertir en JSON
  }

  // Méthode pour récupérer le user ID à partir du token
  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = this.decodeToken(token);
    return decoded?.sub || null; // Remplacer par la clé exacte utilisée dans votre token
  }
  // Login method
  login(data: any): Observable<any> {
    console.log('Attempting login with:', data);
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((response: any) => {
        console.log('Login successful, token:', response.token);
        this.saveToken(response.token);  
        this.router.navigate(['/categories']); 
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  // Logout method
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey); // Clear user info on logout
    this.router.navigate(['/login']);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false; 
    }

    // Verification de l'expiration du token JWT
    const payload = JSON.parse(atob(token.split('.')[1])); // Décodage du payload
    const exp = payload.exp; // Heure d'expiration en secondes
    const now = Math.floor(Date.now() / 1000); // Heure actuelle en secondes

    if (exp < now) {
      localStorage.removeItem(this.tokenKey);  // Supprimer le token expiré
      localStorage.removeItem(this.userKey);  // Clear user info if the token is expired
      return false;  
    }

    return true;  // Si le token est valide, utilisateur authentifié
  }

  // Get user details (if saved in localStorage)
  getUser(): any {
    const user = JSON.parse(localStorage.getItem(this.userKey) || '{}');
    console.log('Utilisateur dans getUser:', user);  
    return user;
  }

  // Remove token from localStorage
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey); // Remove user info as well
  }
}
