import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}


  // getActivitiesByUser(userId: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/activities/${userId}`);
  // }

  // Add a new activity
  addActivity(activity: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}` // Le token JWT est récupéré depuis le stockage local
    });
    return this.http.post(`${this.apiUrl}/activity/add`, activity, { headers });
  }

  saveUserWeight(weightData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`  // Token JWT
    });
    // URL correcte de l'API Symfony pour l'ajout des mesures
    return this.http.post(`${this.apiUrl}/api/measurement/add`, weightData, { headers });
  }
  getActivitiesByUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}` // JWT pour authentification
    });
    return this.http.get(`${this.apiUrl}/activities/${userId}`, { headers });
  }
  
}
