import { Component } from '@angular/core';
import { WaterIntakeService } from 'src/app/services/water-intake.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-water-reminder',
  templateUrl: './water-reminder.component.html',
  styleUrls: ['./water-reminder.component.css']
})
export class WaterReminderComponent {

  
  dailyGoal: number = 2000;
  userId: number = 8;  // Change this based on user
  date: string = '';
  time: string = '';
  amount: number = 0;
  message: string = '';
  stats: any = null;
  lastDrink: number = 0; // To store the last drink amount
  cupsConsumed: number = 0; // To store the number of cups consumed
  totalAmount: number = 0;
  constructor(private waterIntakeService: WaterIntakeService,private router: Router) { }
  ngOnInit() {
    this.setDateTime(); 
    this.getStats();
  }

  setDateTime() {
    const currentDate = new Date();
    this.date = currentDate.toISOString().split('T')[0];  // YYYY-MM-DD
    this.time = currentDate.toISOString().split('T')[1].split('.')[0];  // HH:mm:ss
  }

  addWaterIntake() {
    this.setDateTime(); 
    this.waterIntakeService.addWaterIntake(this.userId, this.date, this.time, this.amount).subscribe(
      response => {
        this.message = response.message || 'Water intake added successfully!';
        
        this.getStats();  
        
        this.amount = 0;  // Reset the input field for amount
      },
      error => {
        this.message = error.error?.message || 'An error occurred while adding water intake.';
      }
    );
  }

  // Method to get stats
  getStats() {
    this.waterIntakeService.getWaterIntakeStats(this.userId, this.date).subscribe(
      response => {
        this.stats = response;
        this.message = ''; 
                if (this.stats) {
          this.lastDrink = this.stats.last_amount || 0;  // Example of how to extract last drink
          this.cupsConsumed = this.stats.total_times || 0;  
          this.totalAmount = this.stats.total_amount || 0;// Example for cups consumed
        }
      },
      error => {
        this.message = error.error?.message || 'An error occurred while fetching stats.';
      }
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
  
  logout() {
    
    this.router.navigate(['/login']);
    console.log('User logged out');
  }
}
