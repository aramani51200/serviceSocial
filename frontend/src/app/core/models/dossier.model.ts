export type DossierStatut =
  | 'A_VALIDER'
  | 'EN_COURS'
  | 'INCOMPLET'
  | 'VALIDE'
  | 'CLOTURE';

export interface Dossier {
  id: number;
  section: string;
  numero: string;
  adherentNom: string;
  matricule: string;
  dateEvenement: string | null;
  lieu: string | null;
  nature: string | null;
  description: string | null;
  statut: DossierStatut;
  dateCreation: string;
  dateMaj: string;
}

export interface DossierRequest {
  numero: string;
  adherentNom: string;
  matricule: string;
  dateEvenement: string | null;
  lieu: string | null;
  nature: string | null;
  description: string | null;
  statut: DossierStatut;
}

export interface DossierPage {
  content: Dossier[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
