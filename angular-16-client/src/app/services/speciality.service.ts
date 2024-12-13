// src/app/services/speciality.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Speciality } from '../models/speciality.model';

@Injectable({
  providedIn: 'root',
})
export class SpecialityService {
  private baseUrl = 'http://localhost:8080/specialities'; // Ensure this matches your backend URL

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /**
   * Fetch all specialities
   */
  getAll(): Observable<Speciality[]> {
    return this.http.get<Speciality[]>(`${this.baseUrl}`);
  }

  /**
   * Fetch a speciality by ID
   * @param id - Speciality ID
   */
  getById(id: number): Observable<Speciality> {
    return this.http.get<Speciality>(`${this.baseUrl}/${id}`);
  }

  /**
   * Create a new speciality
   * @param speciality - Speciality object to create
   */
  create(speciality: Speciality): Observable<Speciality> {
    return this.http.post<Speciality>(this.baseUrl, speciality, this.httpOptions);
  }

  /**
   * Update an existing speciality
   * @param id - Speciality ID
   * @param speciality - Updated speciality object
   */
  update(id: number, speciality: Speciality): Observable<Speciality> {
    return this.http.put<Speciality>(`${this.baseUrl}/${id}`, speciality, this.httpOptions);
  }

  /**
   * Delete a speciality by ID
   * @param id - Speciality ID
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Fetch a speciality by name
   * @param name - Speciality name
   */
  getByName(name: string): Observable<Speciality> {
    return this.http.get<Speciality>(`${this.baseUrl}/by-name/${name}`);
  }

  /**
   * Fetch the total number of specialities
   */
  getCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }
}
