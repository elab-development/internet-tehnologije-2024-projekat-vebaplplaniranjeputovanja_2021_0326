import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })  // ← BITNO!
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getDestinations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/destinations`);
  }

  getAttractions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/attractions`);
  }

  getTripPlans(token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/trip-plans`, { headers });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }
  get isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }
  deleteDestination(id: number, token: string) {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(`${this.apiUrl}/destinations/${id}`, { headers });
  }
  addDestination(data: FormData, token: string) {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this.apiUrl}/destinations`, data, { headers });
  }
  getCountryInfo(countryName: string) {
    return this.http.get(`https://restcountries.com/v3.1/name/${countryName}`);
  }




}
