import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiConnectService {
  private baseUrl = 'https://api.first.org/data/v1/'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  // GET Request
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url, {
      params,
    });
  }

  // POST Request
  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<T>(url, body, {
      headers,
    });
  }
}