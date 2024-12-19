import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaterIntakeService } from '../services/water-intake.service';

@Component({
  selector: 'app-water-intake-history',
  templateUrl: './water-intake-history.component.html',
  styleUrls: ['./water-intake-history.component.css']
})
export class WaterIntakeHistoryComponent implements OnInit {
  userId: number = 8; // User ID
  waterIntakeHistory: any[] = []; // Array to store water intake history
  errorMessage: string = ''; // For handling errors

  constructor(
    private route: ActivatedRoute,
    private waterIntakeService: WaterIntakeService
  ) { }

  ngOnInit(): void {
    // Retrieve userId from the route
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('userId')!;
      this.fetchWaterIntakeHistory();
    });
  }

  // Fetch the water intake history from the service
  fetchWaterIntakeHistory(): void {
    this.waterIntakeService.getWaterIntakeHistorique(this.userId).subscribe(
      data => {
        if (data.historique && data.historique.length > 0) {
          this.waterIntakeHistory = data.historique;
        } else {
          this.errorMessage = 'No water intake history found for this user.';
        }
      },
      error => {
        this.errorMessage = 'Error fetching water intake history.';
        console.error('Error:', error);
      }
    );
  }
}
