import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private apiUrl = 'http://localhost:8000/api/music';

  constructor(private http: HttpClient) {}

  getAllMusic(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getMusicByGenre(genre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/genre/${genre}`);
  }
}
