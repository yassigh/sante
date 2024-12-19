import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = 98;  // Replace this with a dynamic value if needed
  profileData: any = { sexe: '', niveauActivite: '' };

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,  // Inject AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProfile();
  }

  // Get the profile data
  getProfile(): void {
    this.profileService.getProfile(this.userId).subscribe(
      (response) => {
        this.profileData = response;
      },
      (error) => {
        console.error('Error fetching profile data:', error);
      }
    );
  }

  // Method to navigate to another route
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  // Logout method
  logout(): void {
    // Clear user session or token
    this.authService.removeToken();  // Remove the token on logout
    this.router.navigate(['/login']);  // Redirect to the login page
  }

  // Select gender (Male or Female)
  selectGender(gender: string): void {
    this.profileData.sexe = gender;
  }

  // Create or Update profile
  saveProfile(): void {
    if (this.profileData.id) {
      // If the profile already has an ID, it's an update
      this.profileService.updateProfile(this.profileData).subscribe(
        (response) => {
          console.log('Profile updated:', response);
        },
        (error) => {
          console.error('Error updating profile:', error);
        }
      );
    } else {
      // If no ID, it's a new profile
      this.profileService.createProfile(this.profileData).subscribe(
        (response) => {
          console.log('Profile created:', response);
        },
        (error) => {
          console.error('Error creating profile:', error);
        }
      );
    }
  }
}
