import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rendezvous } from '../models/rendezvous.model';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  private apiUrl = 'http://localhost:8080/rendezvous'; // Update as per your backend URL

  constructor(private http: HttpClient) {}

  getAllRendezvous(): Observable<Rendezvous[]> {
    return this.http.get<Rendezvous[]>(this.apiUrl);
  }

  getRendezvousById(id: number): Observable<Rendezvous> {
    return this.http.get<Rendezvous>(`${this.apiUrl}/${id}`);
  }

  createRendezvous(rendezvous: Rendezvous): Observable<Rendezvous> {
    return this.http.post<Rendezvous>(this.apiUrl, rendezvous);
  }

  updateRendezvous(rendezvous: Rendezvous): Observable<Rendezvous> {
    return this.http.put<Rendezvous>(this.apiUrl, rendezvous);
  }

  deleteRendezvous(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getRendezvousByPatientId(patientId: number): Observable<Rendezvous[]> {
    return this.http.get<Rendezvous[]>(`${this.apiUrl}/by-patient/${patientId}`);
  }

  getRendezvousByMedecinId(medecinId: number): Observable<Rendezvous[]> {
    return this.http.get<Rendezvous[]>(`${this.apiUrl}/by-medecin/${medecinId}`);
  }
  
}
