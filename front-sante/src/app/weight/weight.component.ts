import { Component } from '@angular/core';
import { ActivityService } from '../activity.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.css']
})
export class WeightComponent {
  weight: number = 0;
  height: number = 0;
  userId: number | null = null;

  constructor(
    private activityService: ActivityService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur connecté
    this.userId = this.authService.getUserIdFromToken();
    if (!this.userId) {
      console.error('User not authenticated');
    }
  }

  save(): void {
    if (!this.userId) {
      alert('User not authenticated. Please log in.');
      return;
    }

    // Préparer les données
    const payload = {
      weight: this.weight,
      height: this.height,
      user_id: this.userId
    };

    // Envoyer les données à l'API pour enregistrer le poids et la taille
    this.activityService.saveUserWeight(payload).subscribe(
      (response) => {
        console.log('Weight and height saved successfully', response);
        alert('Weight and height saved successfully');
      },
      (error) => {
        console.error('Error saving weight and height', error);
        alert('Error saving weight and height');
      }
    );
  }
}
