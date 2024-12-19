// src/app/registration.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8000/api';// Adjust your endpoint

  constructor(private http: HttpClient) {}

  
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);  // Note l'URL
}
}
