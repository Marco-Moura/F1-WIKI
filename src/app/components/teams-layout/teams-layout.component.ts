import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-teams-layout',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './teams-layout.component.html',
  styleUrl: './teams-layout.component.css'
})
export class TeamsLayoutComponent implements OnInit {

  mobileMenuVisible: boolean = true;
  isMobileMenuOpen: boolean = true;
  
  // ✅ Controle do menu de usuário
  isUserMenuOpen = false;
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
    this.authService.currentUser$.subscribe(u => this.user = u);
  }

  navigateToTeams() { this.router.navigate(['/teams']); }
  navigateToHome() { this.router.navigate(['/']); }
  navigateToDrivers() { this.router.navigate(['/drivers']); }
  navigateToHistory() { this.router.navigate(['/history']); }
  navigateToRules() { this.router.navigate(['/rules']); }
  navigateToCareer() { this.router.navigate(['/career']); }
  
  toggleMobileMenu(): void { this.mobileMenuVisible = !this.mobileMenuVisible; }

  // ✅ Controle do menu de usuário
  toggleUserMenu() { this.isUserMenuOpen = !this.isUserMenuOpen; }
  
  navigateToLogin() { this.router.navigate(['/login']); this.isUserMenuOpen = false; }
  
  navigateToRegister() { this.router.navigate(['/signup']); this.isUserMenuOpen = false; }

  logout() { 
    this.authService.logout(); 
    this.router.navigate(['/']); 
    this.isUserMenuOpen = false; 
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (!target.closest('.user-menu-container')) {
      this.isUserMenuOpen = false;
    }
  }

  mostrarComparacao = false;

  selectedTeam1: any = null;
  selectedTeam2: any = null;

  teams = [
    {
      name: 'Red Bull Racing',
      teamPrincipal: 'Christian Horner',
      engine: 'Honda RBPT',
      firstEntry: 2005,
      titles: 6,
      drivers: ['Max Verstappen', 'Sergio Perez']
    },
    {
      name: 'Mercedes',
      teamPrincipal: 'Toto Wolff',
      engine: 'Mercedes',
      firstEntry: 1970,
      titles: 8,
      drivers: ['Lewis Hamilton', 'George Russell']
    },
    {
      name: 'Ferrari',
      teamPrincipal: 'Frédéric Vasseur',
      engine: 'Ferrari',
      firstEntry: 1950,
      titles: 16,
      drivers: ['Charles Leclerc', 'Carlos Sainz']
    },
    {
      name: 'McLaren',
      teamPrincipal: 'Andrea Stella',
      engine: 'Mercedes',
      firstEntry: 1966,
      titles: 8,
      drivers: ['Lando Norris', 'Oscar Piastri']
    },
    {
      name: 'Haas F1 Team',
      teamPrincipal: 'Guenther Steiner',
      engine: 'Ferrari',
      firstEntry: 2016,
      titles: 0,
      drivers: ['Kevin Magnussen', 'Nico Hülkenberg']
    },
    {
      name: 'AlphaTauri',
      teamPrincipal: 'Franz Tost',
      engine: 'Red Bull',
      firstEntry: 1985,
      titles: 0,
      drivers: ['Yuki Tsunoda', 'Daniel Ricciardo']
    },
    {
      name: 'Williams',
      teamPrincipal: 'James Vowles',
      engine: 'Mercedes',
      firstEntry: 1977,
      titles: 9,
      drivers: ['Alexander Albon', 'Logan Sargeant']
    },
    {
      name: 'Aston Martin',
      teamPrincipal: 'Mike Krack',
      engine: 'Mercedes',
      firstEntry: 1959,
      titles: 0,
      drivers: ['Fernando Alonso', 'Lance Stroll']
    },
    {
      name: 'Alpine',
      teamPrincipal: 'Bruno Famin',
      engine: 'Renault',
      firstEntry: 1981,
      titles: 2,
      drivers: ['Esteban Ocon', 'Pierre Gasly']
    }
  ];
}
