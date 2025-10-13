import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  // Placeholder data – replace with real user info when available
  user = {
    firstName: 'Cheikh',
    lastName: 'Gueye',
    email: 'cgueye@yopmail.com',
    phone: '77 123 45 67',
    role: 'Administrateur',
    status: 'Compte actif'
  };
}
