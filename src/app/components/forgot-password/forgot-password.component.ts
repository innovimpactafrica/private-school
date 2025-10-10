import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  selectedMethod: 'email' | 'phone' = 'email';
  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.forgotForm = this.fb.group({
      contact: ['']
    });
  }

  selectMethod(method: 'email' | 'phone') {
    this.selectedMethod = method;
    // Réinitialiser le champ quand on change de méthode
    this.forgotForm.patchValue({ contact: '' });
  }

  onSubmit() {
    // Focus sur le design - pas de validation
    this.isLoading = true;

    // Simuler l'envoi du code puis rediriger vers OTP
    setTimeout(() => {
      this.isLoading = false;
      console.log('Code envoyé à:', this.forgotForm.value.contact, 'via', this.selectedMethod);
      // Redirection vers la page OTP
      this.router.navigate(['/otp-verification']);
    }, 1000);
  }
}