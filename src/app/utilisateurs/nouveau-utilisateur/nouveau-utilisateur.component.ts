import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-nouveau-utilisateur',
    standalone: true,
    imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
    templateUrl: './nouveau-utilisateur.component.html',
    styleUrls: ['./nouveau-utilisateur.component.css']
})
export class NouveauUtilisateurComponent implements OnDestroy {
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

    constructor(private router: Router) { }

    get isFormValid(): boolean {
        return !!(
            this.form.prenom &&
            this.form.nom &&
            this.form.email &&
            this.form.telephone &&
            this.form.adresse &&
            this.form.role
        );
    }

    enregistrer() {
        // Open confirmation popup only when fields are filled
        if (this.isFormValid) {
            this.isConfirmOpen = true;
        } else {
            // Optional: highlight missing fields or keep silent per requirements
            this.isConfirmOpen = true; // If you'd prefer always showing, keep this
        }
    }

    annuler() {
        history.back();
    }

    closeConfirm() {
        this.isConfirmOpen = false;
    }

    confirmCreate() {
        // TODO: integrate API call here
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
