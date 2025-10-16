import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { TimePickerComponent } from '../../shared/time-picker/time-picker.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DayConfig, SchoolItem, SchoolsService } from '../schools.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-edit-school',
    standalone: true,
    imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent, TimePickerComponent],
    templateUrl: './edit-school.component.html',
    styleUrls: ['./edit-school.component.css']
})
export class EditSchoolComponent implements OnInit, OnDestroy {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private schoolsService: SchoolsService
    ) { }

    id!: number;
    name = '';
    address = '';
    status: 'Actif' | 'Inactif' = 'Actif';
    logoFile?: File;
    logoPreviewUrl?: string;
    currentLogoUrl?: string | null;
    days: DayConfig[] = [];
    private sub?: Subscription;
    showSuccess = false;
    private successTimer?: any;
    private objectUrlToRevoke?: string | null;

    ngOnInit(): void {
        this.sub = this.route.paramMap.subscribe(pm => {
            const idParam = pm.get('id');
            this.id = idParam ? Number(idParam) : NaN;
            const data = this.schoolsService.getById(this.id);
            if (!data) {
                this.router.navigate(['/schools']);
                return;
            }
            this.name = data.name;
            this.address = data.address;
            this.status = data.status;
            this.days = data.schedule.map(d => ({ ...d }));
            this.currentLogoUrl = data.logoUrl ?? null;
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
        if (this.successTimer) clearTimeout(this.successTimer);
        if (this.objectUrlToRevoke) {
            URL.revokeObjectURL(this.objectUrlToRevoke);
            this.objectUrlToRevoke = null;
        }
    }

    onDropLogo(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            this.setLogoFile(files[0]);
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onFileInput(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.setLogoFile(input.files[0]);
        }
    }

    openFilePicker(event: MouseEvent, fileInput: HTMLInputElement) {
        event.preventDefault();
        event.stopPropagation();
        fileInput.click();
    }

    private setLogoFile(file: File) {
        this.logoFile = file;
        // Revoke previous object URL if any
        if (this.objectUrlToRevoke) {
            URL.revokeObjectURL(this.objectUrlToRevoke);
            this.objectUrlToRevoke = null;
        }
        // Create object URL for preview and display
        const url = URL.createObjectURL(file);
        this.logoPreviewUrl = url;
        this.currentLogoUrl = url;
        this.objectUrlToRevoke = url;
    }

    cancel() {
        this.router.navigate(['/schools']);
    }

    async update() {
        if (!this.name.trim() || !this.address.trim()) return;
        const prev = this.schoolsService.getById(this.id);
        if (!prev) return;
        const updated: SchoolItem = {
            ...prev,
            name: this.name.trim(),
            address: this.address.trim(),
            status: this.status,
            schedule: this.days.map(d => ({ ...d }))
        };
        // If a new logo file is selected, persist it as a Data URL (base64) for reuse across pages
        if (this.logoFile) {
            try {
                updated.logoUrl = await this.readFileAsDataURL(this.logoFile);
            } catch (e) {
                // If reading fails, keep existing logoUrl
                updated.logoUrl = prev.logoUrl;
            }
        }
        this.schoolsService.updateSchool(updated);

        this.showSuccess = true;
        this.successTimer = setTimeout(() => {
            this.showSuccess = false;
            this.router.navigate(['/schools']);
        }, 3000);
    }

    private readFileAsDataURL(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });
    }

    onToggleOpen(day: DayConfig) {
        if (day.open) {
            if (day.openTime === '00:00' || !day.openTime) day.openTime = '08:00';
            if (day.closeTime === '00:00' || !day.closeTime) day.closeTime = '18:00';
        }
    }
}
