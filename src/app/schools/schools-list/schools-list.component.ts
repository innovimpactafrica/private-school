import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { SchoolsService, SchoolItem } from '../schools.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-schools-list',
    standalone: true,
    imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
    templateUrl: './schools-list.component.html',
    styleUrls: ['./schools-list.component.css']
})
export class SchoolsListComponent implements OnInit, OnDestroy {
    constructor(private router: Router, private schoolsService: SchoolsService) { }
    search = '';
    private sub?: Subscription;
    schools: SchoolItem[] = [];

    ngOnInit(): void {
        this.sub = this.schoolsService.schools$.subscribe(list => {
            this.schools = list;
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    get filteredSchools() {
        const t = this.search.trim().toLowerCase();
        if (!t) return this.schools;
        return this.schools.filter(s => s.name.toLowerCase().includes(t) || s.address.toLowerCase().includes(t));
    }

    goToCreate() {
        this.router.navigate(['/schools/nouvelle-ecole']);
    }

    editSchool(s: SchoolItem) {
        // Navigate with id if exists, else fallback to list
        if ((s as any).id != null) {
            this.router.navigate(['/schools/modifier-ecole', (s as any).id]);
        }
    }
}
