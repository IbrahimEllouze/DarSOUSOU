import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'http://localhost:8080/patients'; // Adjust to match your Spring Boot backend URL

  constructor(private http: HttpClient) {}

  // Get all patients
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}`);
  }

  // Get a single patient by ID
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  // Add a new patient
  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  // Update an existing patient
  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${patient.id}`, patient);
  }
  
  
  

  // Delete a patient by ID
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Find a patient by name
  findPatientByName(name: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/by-name/${name}`);
  }

  // Get the count of patients
  getQuantityOfPatient(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
export type { Patient };

