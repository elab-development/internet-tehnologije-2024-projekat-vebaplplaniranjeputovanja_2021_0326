import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })  // ← BITNO!
export class ApiService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getDestinations(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8000/api/destinations');
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
  addDestination(data: FormData, token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post<any>(`${this.apiUrl}/destinations`, data, { headers });
  }
  getCountryInfo(countryName: string) {
    return this.http.get(`https://restcountries.com/v3.1/name/${countryName}`);
  }
  // u api.service.ts
  getDestinationsCached(): any[] | null {
    const raw = localStorage.getItem('destinations');
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      // očekujemo strukturu { items: [...], cachedAt: number }
      if (!parsed.items || !parsed.cachedAt) return parsed.items || null;
      const age = Date.now() - parsed.cachedAt;
      const TTL = 5 * 60 * 1000; // 5 minuta
      if (age > TTL) {
        // cache expired
        localStorage.removeItem('destinations');
        return null;
      }
      return parsed.items;
    } catch (e) {
      localStorage.removeItem('destinations');
      return null;
    }
  }


  getDestinationsFromApi(): Observable<any> {
    return this.http.get(`${this.apiUrl}/destinations`);
  }




}
