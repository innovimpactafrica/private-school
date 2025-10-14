import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';


@Component({
	selector: 'app-account',
	standalone: true,
	imports: [CommonModule, FormsModule, SidebarComponent, HeaderComponent],
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

	// Modal state and editable draft
	isEditOpen = false;
	edit = {
		firstName: '',
		lastName: '',
		email: '',
		phone: ''
	};

	openEdit() {
		this.edit = {
			firstName: this.user.firstName,
			lastName: this.user.lastName,
			email: this.user.email,
			phone: this.user.phone,
		};
		this.isEditOpen = true;
	}

	closeEdit() {
		this.isEditOpen = false;
	}

	saveEdit() {
		this.user = {
			...this.user,
			firstName: this.edit.firstName,
			lastName: this.edit.lastName,
			email: this.edit.email,
			phone: this.edit.phone,
		};
		this.isEditOpen = false;
	}

	goBack() {
		// Placeholder: hook up router navigation if needed
		history.back();
	}
}

