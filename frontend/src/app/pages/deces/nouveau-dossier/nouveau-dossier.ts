import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Adherent {
  id: number;
  cin: string;
  matricule: string;
  nom: string;
  prenom: string;
}

@Component({
  selector: 'app-nouveau-dossier',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './nouveau-dossier.html',
  styleUrl: './nouveau-dossier.css'
})
export class NouveauDossier {

  // ==========================================
  // ADHERENTS STATIC POUR LE MOMENT
  // ==========================================

  adherents: Adherent[] = [

    {
      id: 1,
      cin: 'AB123456',
      matricule: '123456',
      nom: 'ALAMI',
      prenom: 'Mohamed'
    },

    {
      id: 2,
      cin: 'CD789012',
      matricule: '789012',
      nom: 'BENALI',
      prenom: 'Ahmed'
    },

    {
      id: 3,
      cin: 'EF345678',
      matricule: '345678',
      nom: 'EL IDRISSI',
      prenom: 'Youssef'
    },

    {
      id: 4,
      cin: 'GH901234',
      matricule: '901234',
      nom: 'TAOUFIK',
      prenom: 'Hassan'
    }

  ];


  // ==========================================
  // RECHERCHE
  // ==========================================

  rechercheAdherent = '';

  resultatsRecherche: Adherent[] = [];

  adherentSelectionne: Adherent | null = null;


  // ==========================================
  // DOSSIER
  // ==========================================

  dossier = {

  adherentId: null as number | null,

  nomComplet: '',

  dateDeces: '',

  lieuDeces: '',

  natureDeces: '',

  causeDeces: '',

  dpr: '',

  observation: ''

};

  // ==========================================
  // RECHERCHE DYNAMIQUE
  // ==========================================

  rechercherAdherent(): void {

    const value =
      this.rechercheAdherent
        .trim()
        .toLowerCase();


    if (!value) {

      this.resultatsRecherche = [];

      return;

    }


    this.resultatsRecherche =
      this.adherents.filter(adherent =>

        adherent.cin
          .toLowerCase()
          .includes(value)

        ||

        adherent.matricule
          .toLowerCase()
          .includes(value)

      );

  }


  // ==========================================
  // SELECTION
  // ==========================================

  selectionnerAdherent(
    adherent: Adherent
  ): void {

    this.adherentSelectionne = adherent;


    this.dossier.adherentId =
      adherent.id;


    this.dossier.nomComplet =
      `${adherent.nom} ${adherent.prenom}`;


    // IMPORTANT
    // نفس input ديال البحث كيولي فيه الاسم

    this.rechercheAdherent =
      `${adherent.nom} ${adherent.prenom}`;


    // إخفاء النتائج

    this.resultatsRecherche = [];

  }


  // ==========================================
  // CHANGER ADHERENT
  // ==========================================

  changerAdherent(): void {

    this.adherentSelectionne = null;

    this.dossier.adherentId = null;

    this.dossier.nomComplet = '';

    this.rechercheAdherent = '';

    this.resultatsRecherche = [];

  }


  // ==========================================
  // ENREGISTRER
  // ==========================================

  enregistrer(): void {

    if (!this.adherentSelectionne) {

      alert(
        'Veuillez sélectionner un adhérent.'
      );

      return;

    }


    if (
      !this.dossier.dateDeces ||
      !this.dossier.lieuDeces
    ) {

      alert(
        'Veuillez renseigner la date et le lieu du décès.'
      );

      return;

    }


    console.log(
      'Dossier décès:',
      this.dossier
    );


    alert(
      'Dossier décès enregistré avec succès.'
    );

  }


  // ==========================================
  // ANNULER
  // ==========================================

  annuler(): void {

    this.dossier = {

      adherentId: null,

      nomComplet: '',

      dateDeces: '',

      lieuDeces: '',

      natureDeces: '',

      causeDeces: '',

      dpr: '',

      observation: ''

    };


    this.changerAdherent();

  }

}