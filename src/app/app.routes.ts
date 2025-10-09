import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
    },
    {
        path: 'otp-verification',
        loadComponent: () => import('./components/otp-verification/otp-verification.component').then(m => m.OtpVerificationComponent)
    },
];
