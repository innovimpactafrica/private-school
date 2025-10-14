import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'forgot-password',
        loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    {
        path: 'otp-verification',
        loadComponent: () => import('./components/otp-verification/otp-verification.component').then(m => m.OtpVerificationComponent)
    },
    {
        path: 'reset-password',
        loadComponent: () => import('./components/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
    },
    {
        path: 'sidebar',
        loadComponent: () => import('./components/sidebar/sidebar.component').then(m => m.SidebarComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'account',
        loadComponent: () => import('./components/account/account.component').then(m => m.AccountComponent)
    },

    {
        path: 'header',
        loadComponent: () => import('./components/header/header.component').then(m => m.HeaderComponent)
    },
    {
        path: 'nouveau-utilisateur',
        loadComponent: () => import('./utilisateurs/nouveau-utilisateur/nouveau-utilisateur.component').then(m => m.NouveauUtilisateurComponent)
    },
    {
        path: 'modifier-utilisateur',
        loadComponent: () => import('./utilisateurs/modifier-utilisateur/modifier-utilisateur.component').then(m => m.ModifierUtilisateurComponent)
    },
    {
        path: 'liste-utilisateurs',
        loadComponent: () => import('./utilisateurs/liste-utilisateurs/liste-utilisateurs.component').then(m => m.ListeUtilisateursComponent)
    },
    // Fallback pour routes non définies
    { path: '**', redirectTo: 'login' },
];
