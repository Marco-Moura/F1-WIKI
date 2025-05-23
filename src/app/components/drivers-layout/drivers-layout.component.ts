import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-drivers-layout',
  templateUrl: './drivers-layout.component.html',
  styleUrls: ['./drivers-layout.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DriversLayoutComponent implements OnInit {
  mobileMenuVisible: boolean = true;
  isUserMenuOpen: boolean = false;
  user: User | null = null;
  isBrowser: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.authService.currentUser$.subscribe(u => this.user = u);
    }
  }

  navigateToTeams() { this.router.navigate(['teams']); }
  navigateToHome() { this.router.navigate(['/home']); }
  navigateToDrivers() { this.router.navigate(['/drivers']); }
  navigateToHistory() { this.router.navigate(['/history']); }
  navigateToRules() { this.router.navigate(['/rules']); }
  navigateToCareer() { this.router.navigate(['/career']); }

  toggleMobileMenu(): void { this.mobileMenuVisible = !this.mobileMenuVisible; }

  toggleUserMenu(): void { this.isUserMenuOpen = !this.isUserMenuOpen; }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
    this.isUserMenuOpen = false;
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
    this.isUserMenuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
    this.isUserMenuOpen = false;
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement): void {
    if (!target.closest('.user-menu-container')) {
      this.isUserMenuOpen = false;
    }
  }
}
