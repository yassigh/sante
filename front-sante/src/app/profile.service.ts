import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8000/api/profile'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  // Get profile (for a specific user)
  getProfile(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get?userId=${userId}`);
  }

  // Create profile
  createProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, profileData);
  }

  // Update profile
  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, profileData);
  }
}