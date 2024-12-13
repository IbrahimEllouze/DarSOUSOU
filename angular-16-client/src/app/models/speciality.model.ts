import { Medecin } from "./medecin.model";

// src/app/models/speciality.model.ts
export interface Speciality {
    id: number;
    specialityName: string;
    medecins: Medecin[]; // Add this relationship
  }
  