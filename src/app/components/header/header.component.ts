import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isOpen = false;
  isProfileOpen = false;
  
  

  toggleProfileMenu(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.isProfileOpen = !this.isProfileOpen;
  }

  constructor(private eRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isProfileOpen = false;
    }
  }

}
