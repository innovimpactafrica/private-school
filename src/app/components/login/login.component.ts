import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    // Focus sur le design - pas de validation
    this.isLoading = true;

    // Simuler une connexion réussie
    setTimeout(() => {
      this.isLoading = false;
      console.log('Connexion réussie avec:', this.loginForm.value);
      // Redirection vers le dashboard après connexion réussie
      this.router.navigate(['/dashboard']);
    }, 1000);
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
