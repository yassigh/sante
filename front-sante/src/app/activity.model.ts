export class Activity {
    id?: number;         // Optionnel, si vous souhaitez récupérer l'ID du backend
    nom: string;
    heure: number;       // Le temps en heures
    age: number;
  
    constructor(nom: string, heure: number, age: number) {
      this.nom = nom;
      this.heure = heure;
      this.age = age;
    }
  }
  