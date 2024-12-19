// src/app/registration/registration.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private registrationService: RegistrationService,private router: Router) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.registrationService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          this.router.navigate(['/login']); },
        error: (error) => {
          this.error = 'Registration error: ' + error.message;
        }
      });
    } else {
      this.error = 'Please fill out the form correctly.';
    }
  }
}
