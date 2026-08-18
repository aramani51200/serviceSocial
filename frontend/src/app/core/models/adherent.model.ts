export interface Adherent {
  id: number;

  prenomAr: string;
  nomAr: string;

  categorie: string;
  grade: string;

  matriculeBR: string;
  matricule: string;

  dateNaissance: string;
  lieuNaissance: string;

  dateRadiation: string | null;
  motifRadiation: string | null;

  dateDeces: string | null;
  causeDeces: string | null;

  dernierUnite: string;
  formationUnite: string;

  telephone1: string;
  telephone2: string | null;

  adresse: string;
  email: string;

  situationCategorie: string;
  pension: boolean;

  cin: string;
}