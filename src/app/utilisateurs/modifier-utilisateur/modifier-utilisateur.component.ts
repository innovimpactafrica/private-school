import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-modifier-utilisateur',
    standalone: true,
    imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
    templateUrl: './modifier-utilisateur.component.html',
    styleUrls: ['./modifier-utilisateur.component.css']
})
export class ModifierUtilisateurComponent implements OnDestroy {
    form = {
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
        role: ''
    };

    isConfirmOpen = false;
    isSuccessOpen = false;
    private successTimeout?: any;

    constructor(private router: Router) {

        const state = history.state as any;
        if (state && state.user) {
            const [prenom, ...rest] = (state.user.nom || '').split(' ');
            const nom = rest.join(' ');
            this.form = {
                prenom: prenom || '',
                nom: nom || '',
                email: state.user.email || '',
                telephone: state.user.telephone || '',
                adresse: state.user.adresse || '',
                role: state.user.role || ''
            };
        }
    }

    enregistrer() {
        // Open confirmation modal instead of immediate navigation
        this.isConfirmOpen = true;
    }

    annuler() {
        this.router.navigate(['/liste-utilisateurs']);
    }

    closeConfirm() {
        this.isConfirmOpen = false;
    }

    confirmUpdate() {
        // TODO: integrate API update call
        this.isConfirmOpen = false;
        this.isSuccessOpen = true;
        this.successTimeout = setTimeout(() => {
            this.isSuccessOpen = false;
            this.router.navigate(['/liste-utilisateurs']);
        }, 3000);
    }

    ngOnDestroy(): void {
        if (this.successTimeout) {
            clearTimeout(this.successTimeout);
        }
    }
}
