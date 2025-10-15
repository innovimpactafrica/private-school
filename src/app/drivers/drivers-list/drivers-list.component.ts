import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-drivers-list',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
  templateUrl: './drivers-list.component.html',
  styleUrls: ['./drivers-list.component.css']
})
export class DriversListComponent implements OnDestroy {
  search = '';

  drivers = [
    { initials: 'AN', firstName: 'Abou', lastName: 'Fall', name: 'Abou Fall', id: 'US-2025-05', contact: '78 362 54 24', vehicle: 'BUS / AA-1234-AB', vehicleColor: 'Rouge', email: 'fallabou@yopmail.com', statut: 'En attente', trajets: 0 },
    { initials: 'JN', firstName: 'Jean', lastName: 'Ngom', name: 'Jean Ngom', id: 'US-2025-04', contact: '77 835 24 24', vehicle: 'Jeep / AB-7890-CD', vehicleColor: 'Noir', email: 'ngomjean@yopmail.com', statut: 'Approuvé', trajets: 9 },
    { initials: 'MD', firstName: 'Mama', lastName: 'Dramé', name: 'Mama Dramé', id: 'US-2025-03', contact: '76 389 36 26', vehicle: 'Ford / ZZ-4567-EF', vehicleColor: 'Blanc', email: 'mamadrame@yopmail.com', statut: 'Approuvé', trajets: 20 },
  ];

  isViewOpen = false;
  selectedDriver: any = null;
  isEditOpen = false;
  isSuccessOpen = false;
  private successTimer?: any;

  get filteredDrivers() {
    const t = this.search.trim().toLowerCase();
    if (!t) return this.drivers;
    return this.drivers.filter(d =>
      d.name.toLowerCase().includes(t) || d.contact.replace(/\s/g, '').includes(t.replace(/\s/g, '')) || d.vehicle.toLowerCase().includes(t)
    );
  }

  openDriver(d: any) {
    this.selectedDriver = d;
    this.isViewOpen = true;
  }

  closeModal() {
    this.isViewOpen = false;
    this.isEditOpen = false;
    this.selectedDriver = null;
  }

  openEdit(d: any) {
    this.selectedDriver = d;
    this.isEditOpen = true;
  }

  acceptDriver() {
    // Optionally update status to reflect acceptance
    if (this.selectedDriver) {
      this.selectedDriver.statut = 'Approuvé';
    }
    this.isSuccessOpen = true;
    // Auto-hide after 3 seconds
    if (this.successTimer) clearTimeout(this.successTimer);
    this.successTimer = setTimeout(() => {
      this.isSuccessOpen = false;
      this.isEditOpen = false;
      this.selectedDriver = null;
    }, 2000);
  }

  ngOnDestroy() {
    if (this.successTimer) {
      clearTimeout(this.successTimer);
    }
  }
}
