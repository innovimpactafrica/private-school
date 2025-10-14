import { Component } from '@angular/core';
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
export class ModifierUtilisateurComponent {
    form = {
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        adresse: '',
        role: ''
    };

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
        // TODO: integrate API; for now, just go back to list
        this.router.navigate(['/liste-utilisateurs']);
    }

    annuler() {
        this.router.navigate(['/liste-utilisateurs']);
    }
}
