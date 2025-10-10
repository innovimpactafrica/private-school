import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-otp-verification',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule],
    templateUrl: './otp-verification.component.html',
    styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {
    otpForm: FormGroup;
    isLoading: boolean = false;
    userEmail: string = 'votre@email.com'; // Récupéré depuis la navigation

    constructor(private fb: FormBuilder, private router: Router) {
        this.otpForm = this.fb.group({
            digit1: [''],
            digit2: [''],
            digit3: [''],
            digit4: ['']
        });
    }

    onSubmit() {
        // Focus sur le design - pas de validation
        this.isLoading = true;

        // Simuler la vérification OTP
        setTimeout(() => {
            this.isLoading = false;
            const otpCode = Object.values(this.otpForm.value).join('');
            console.log('Code OTP vérifié:', otpCode);
            // Redirection vers reset-password après vérification réussie
            this.router.navigate(['/reset-password']);
        }, 1500);
    }

    resendCode() {
        console.log('Code renvoyé à:', this.userEmail);
        // Animation ou feedback de renvoi
    }

    // Navigation automatique entre les champs
    onInputChange(event: any, nextField?: string) {
        const value = event.target.value;
        if (value.length === 1 && nextField) {
            const nextInput = document.getElementById(nextField);
            if (nextInput) {
                (nextInput as HTMLInputElement).focus();
            }
        }
    }

    // Navigation avec backspace
    onKeyDown(event: any, prevField?: string) {
        if (event.key === 'Backspace' && event.target.value === '' && prevField) {
            const prevInput = document.getElementById(prevField);
            if (prevInput) {
                (prevInput as HTMLInputElement).focus();
            }
        }
    }
}