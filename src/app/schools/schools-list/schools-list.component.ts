import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-schools-list',
    standalone: true,
    imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
    templateUrl: './schools-list.component.html',
    styleUrls: ['./schools-list.component.css']
})
export class SchoolsListComponent {
    constructor(private router: Router) { }
    search = '';

    schools = [
        { name: 'Collège de Dakar', address: 'Dakar, rue 21', created: '05/10/2025', status: 'Actif' },
        { name: 'Lycée el amine', address: 'Parcelles, unité 12', created: '05/10/2025', status: 'Inactif' },
    ];

    get filteredSchools() {
        const t = this.search.trim().toLowerCase();
        if (!t) return this.schools;
        return this.schools.filter(s => s.name.toLowerCase().includes(t) || s.address.toLowerCase().includes(t));
    }

    goToCreate() {
        this.router.navigate(['/schools/nouvelle-ecole']);
    }
}
