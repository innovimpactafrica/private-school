import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';


@Component({
	selector: 'app-account',
	standalone: true,
	imports: [CommonModule, SidebarComponent, HeaderComponent],
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent {
	user = {
		firstName: 'Cheikh',
		lastName: 'Gueye',
		role: 'Administrateur',
		status: 'Actif',
		phone: '+221 77 123 45 67',
		email: 'cheikh@example.com'
	};

	goBack() {
		// Placeholder: hook up router navigation if needed
		history.back();
	}
}

