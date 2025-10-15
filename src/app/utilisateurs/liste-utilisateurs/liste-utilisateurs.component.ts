import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-liste-utilisateurs',
  standalone: true,
  imports: [CommonModule, SidebarComponent, FormsModule, HeaderComponent],
  templateUrl: './liste-utilisateurs.component.html',
  styleUrl: './liste-utilisateurs.component.css'
})
export class ListeUtilisateursComponent {

  users = [
    { nom: 'Abou Fall', adresse: 'Yembeul, rue 21', email: 'fallabou@gmail.com', telephone: '77 234 56 78', role: 'Admin', statut: 'Actif' },
    { nom: 'Jean Ngom', adresse: 'Ouakam, rue 2', email: 'ngomjean@gmail.com', telephone: '76 234 00 98', role: 'Resp. Logistique', statut: 'Actif' },
    { nom: 'Mama Drame', adresse: 'Parcelles, unité 12', email: 'dramemama@gmail.com', telephone: '78 934 06 08', role: 'Resp. Logistique', statut: 'Inactif' },
  ];

  constructor(private router: Router) { }

  goToCreate() {
    this.router.navigate(['/nouveau-utilisateur']);
  }

  goToEdit(user: any) {
    // Navigate to edit page with user data in navigation state
    this.router.navigate(['/modifier-utilisateur'], { state: { user } });
  }
}
