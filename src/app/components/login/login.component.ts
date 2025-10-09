import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  constructor(private fb: FormBuilder) {
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
      // Ici redirection ou action de succès
    }, 1500);
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
