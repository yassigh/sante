import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  age: number = 0;
  selectedActivity: string = '';
  time: number = 0;
  activities: any[] = []; // Liste des activités
  goalReached: boolean = false;
  currentDate: Date = new Date();
  selectedPeriod: string = 'jour';

  userId: number | null = null;

  constructor(
    private activityService: ActivityService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID utilisateur à partir du token
    this.userId = this.authService.getUserIdFromToken();

    if (this.userId) {
      // Charger les activités pour cet utilisateur
      this.loadUserActivities();
    } else {
      console.error('User ID not found in token');
    }
  }

  /**
   * Charger les activités pour un utilisateur donné
   */
  private loadUserActivities(): void {
    if (this.userId) {
      this.activityService.getActivitiesByUser(this.userId).subscribe(
        (data) => {
          this.activities = data; // Charger les activités dans la liste
        },
        (error) => {
          console.error('Erreur lors de la récupération des activités', error);
        }
      );
    }
  }

  /**
   * Vérifie si l'objectif a été atteint
   */
  checkGoal(): void {
    if (this.time >= 2 && this.selectedActivity.toLowerCase() !== 'exercice') {
      this.goalReached = true;
    } else {
      this.goalReached = false;
    }
  }

  /**
   * Soumettre une activité
   */
  submitActivity(): void {
    if (!this.userId) {
      alert('User ID non trouvé. Veuillez vous reconnecter.');
      return;
    }

    const payload = {
      activity: this.selectedActivity,
      heure: this.time,
      age: this.age,
      user_id: this.userId // Ajouter l'ID utilisateur
    };

    this.activityService.addActivity(payload).subscribe(
      (response) => {
        console.log('Activité ajoutée avec succès', response);
        alert('Activité ajoutée avec succès');
        this.loadUserActivities(); // Recharger les activités après ajout
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'activité', error);
        alert('Erreur lors de l\'ajout de l\'activité');
      }
    );
  }
}
