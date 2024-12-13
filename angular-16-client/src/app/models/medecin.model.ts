export interface Medecin {
  id: number;
  nom: string;
  email: string;
  listrdv?: any[]; // Make optional
  specialityName: string;
}