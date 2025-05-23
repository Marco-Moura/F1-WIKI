import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-history-layout',
  standalone: true,
  templateUrl: './history-layout.component.html',
  styleUrls: ['./history-layout.component.css'],
  imports: [CommonModule]
})
export class HistoryLayoutComponent implements AfterViewInit, OnInit {
  
  isMobileMenuOpen: boolean = true;
  mobileMenuVisible: boolean = true;
  isUserMenuOpen = false;
  user: User | null = null;
  isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.initializeMobileMenu();
      this.initializeDecadeTabs();
      this.initializeStatsAnimation();
    }
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
    });
  }

  private initializeMobileMenu(): void {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn') as HTMLButtonElement;
    const mobileMenu = document.getElementById('mobileMenu') as HTMLElement;

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  }

  private initializeDecadeTabs(): void {
    const decadeTabs = document.querySelectorAll('.decade-tab') as NodeListOf<HTMLElement>;
    const decadeContents = document.querySelectorAll('.decade-content') as NodeListOf<HTMLElement>;

    decadeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        decadeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        decadeContents.forEach(content => content.classList.add('hidden'));

        const decade = tab.getAttribute('data-decade');
        const selectedContent = document.querySelector(`.decade-content[data-decade="${decade}"]`) as HTMLElement;
        if (selectedContent) {
          selectedContent.classList.remove('hidden');
        }
      });
    });

    if (decadeTabs.length > 0) {
      decadeTabs[0].classList.add('active');
    }
  }

  private initializeStatsAnimation(): void {
    const animateStatsBars = () => {
      const statsBars = document.querySelectorAll('.stats-bar') as NodeListOf<HTMLElement>;
      statsBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
    };

    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');

          if (entry.target.querySelector('.stats-bar')) {
            animateStatsBars();
          }

          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .champion-card, .bg-gray-800').forEach(item => {
      observer.observe(item);
    });
  }

  navigateToTeams() { this.router.navigate(['/teams']); }
  navigateToHome() { this.router.navigate(['/']); }
  navigateToDrivers() { this.router.navigate(['/drivers']); }
  navigateToHistory() { this.router.navigate(['/history']); }
  navigateToRules() { this.router.navigate(['/rules']); }
  navigateToCareer() { this.router.navigate(['/career']); }

  toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  toggleUserMenu() { 
    this.isUserMenuOpen = !this.isUserMenuOpen; 
  }

  navigateToLogin() { 
    this.router.navigate(['/login']); 
    this.isUserMenuOpen = false; 
  }

  navigateToRegister() { 
    this.router.navigate(['/signup']); 
    this.isUserMenuOpen = false; 
  }

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
}
