import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TimePickerComponent } from '../../shared/time-picker/time-picker.component';
import { Router } from '@angular/router';
import { SchoolsService } from '../schools.service';

interface DayConfig {
    day: string;
    open: boolean;
    openTime: string;
    closeTime: string;
}

@Component({
    selector: 'app-new-school',
    standalone: true,
    imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, TimePickerComponent],
    templateUrl: './new-school.component.html',
    styleUrls: ['./new-school.component.css']
})
export class NewSchoolComponent {
    constructor(private router: Router, private schoolsService: SchoolsService) { }

    name = '';
    address = '';
    logoFile?: File;
    showSuccess = false;
    private successTimer?: any;

    days: DayConfig[] = [
        { day: 'Lundi', open: true, openTime: '08:00', closeTime: '18:00' },
        { day: 'Mardi', open: false, openTime: '00:00', closeTime: '00:00' },
        { day: 'Mercredi', open: false, openTime: '00:00', closeTime: '00:00' },
        { day: 'Jeudi', open: false, openTime: '00:00', closeTime: '00:00' },
        { day: 'Vendredi', open: false, openTime: '00:00', closeTime: '00:00' },
        { day: 'Samedi', open: false, openTime: '00:00', closeTime: '00:00' },
        { day: 'Dimanche', open: false, openTime: '00:00', closeTime: '00:00' },
    ];

    goBack() {
        this.router.navigate(['/schools']);
    }

    onDropLogo(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.logoFile = files[0];
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onFileInput(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.logoFile = input.files[0];
        }
    }

    openFilePicker(event: MouseEvent, fileInput: HTMLInputElement) {
        event.preventDefault();
        event.stopPropagation();
        fileInput.click();
    }

    cancel() {
        this.router.navigate(['/schools']);
    }

    save() {
        // Simple validation: require name & address
        if (!this.name.trim() || !this.address.trim()) {
            return;
        }
        // Build school item; created date today dd/mm/yyyy
        const now = new Date();
        const created = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
        this.schoolsService.addSchool({
            name: this.name.trim(),
            address: this.address.trim(),
            created,
            status: 'Actif'
        });

        // Show success popup then redirect after 3s
        this.showSuccess = true;
        this.successTimer = setTimeout(() => {
            this.showSuccess = false;
            this.router.navigate(['/schools']);
        }, 3000);
    }

    onToggleOpen(day: DayConfig, which: 'open' | 'close' = 'open') {
        if (day.open) {
            if (day.openTime === '00:00' || !day.openTime) day.openTime = '08:00';
            if (day.closeTime === '00:00' || !day.closeTime) day.closeTime = '18:00';
        }
    }
}
