import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaterIntakeService {

   private apiUrl = 'http://localhost:8000/api/';  

  constructor(private http: HttpClient) { }

  // Add a new water intake
  addWaterIntake(userId: number, date: string, time: string, amount: number): Observable<any> {
    const body = { user_id: userId, date: date, time: time, amount: amount };
    return this.http.post(`${this.apiUrl}/water-intake`, body);
  }

  // Get water intake stats for a user on a specific date
  getWaterIntakeStats(userId: number, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats/${userId}/${date}`);
  }
  getWaterIntakeHistorique(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/historique/${userId}`);
  }
  
  
}
