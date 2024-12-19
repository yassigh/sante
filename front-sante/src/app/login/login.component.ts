import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Validation de l'email
      password: ['', [Validators.required, Validators.minLength(6)]]  // Validation du mot de passe
    });    this.initializeGoogleLogin();
  }

  onLogin(): void {
    const loginData = this.loginForm.value;
    console.log('Login Data:', loginData);  // Verifiez que les donnees sont correctes

    this.authService.login(loginData).subscribe(
      (response: any) => {
        console.log('Login success', response);
        // Assurez-vous que le token est bien sauvegarde
        localStorage.setItem('token', response.token);
        this.router.navigate(['/categories']);  // Redirige vers la page de catégories
      },
      (error) => {
        this.errorMessage = 'Invalid credentials';
        console.log('Login failed', error);
      }
    );
  }

















  

  initializeGoogleLogin() {
    window.google.accounts.id.initialize({
      client_id: '390286337775-ujmjif3sm2p6hulijo68kk9iobl9mi7k.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    window.google.accounts.id.renderButton(
      document.getElementById("g_id_onload"), 
      { theme: "outline", size: "large" }
    );
  }

  // Méthode pour traiter la réponse de Google
  handleCredentialResponse(response: any): void {
    if (response.credential) {
      // Vous pouvez ici envoyer le token au backend pour validation
      // Exemple de redirection après connexion réussie
      this.router.navigate(['/categories']); // Redirige vers la page des catégories
    } else {
      this.errorMessage = 'Échec de la connexion avec Google.';
    }
  }

  }
