import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  selectedMethod: 'email' | 'phone' = 'email';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetForm = this.fb.group({
      contact: ['']
    });
  }

  selectMethod(method: 'email' | 'phone') {
    this.selectedMethod = method;
    // Réinitialiser le champ quand on change de méthode
    this.resetForm.patchValue({ contact: '' });
  }

  onSubmit() {
    // Focus sur le design - pas de validation
    this.isLoading = true;

    // Simuler l'envoi du code puis rediriger vers OTP
    setTimeout(() => {
      this.isLoading = false;
      console.log('Code envoyé à:', this.resetForm.value.contact, 'via', this.selectedMethod);
      // Redirection vers la page OTP
      this.router.navigate(['/otp-verification']);
    }, 2000);
  }
}