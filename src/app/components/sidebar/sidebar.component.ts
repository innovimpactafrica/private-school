import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  isCollapsed: boolean = false;
  isMobileMenuOpen: boolean = false;
  isMobile: boolean = false;
  private resizeHandler = () => this.checkMobileView();

  menuItems: MenuItem[] = [
    { label: 'Tableau de bord', icon: 'dashboard', route: '/dashboard', active: true },
    { label: 'Gestion des utilisateurs', icon: 'users', route: '/users' },
    { label: 'Gestion des chauffeurs', icon: 'drivers', route: '/drivers' },
    { label: 'Gestion des écoles', icon: 'schools', route: '/schools' },
    { label: 'Calendrier scolaire', icon: 'calendar', route: '/calendar' },
    { label: 'Gestion des trajets', icon: 'routes', route: '/routes' },
    { label: 'Gestion des paiements', icon: 'payments', route: '/payments' },
    { label: 'Notifications', icon: 'notifications', route: '/notifications' }
  ];

  userProfile = {
    name: 'Cheikh Gueye',
    role: 'Administrateur',
    avatar: null
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkMobileView();
    window.addEventListener('resize', this.resizeHandler);
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuItems.forEach(item => item.active = item.route === route);

    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  private checkMobileView(): void {
    this.isMobile = window.innerWidth < 1024;
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeHandler);
  }
}