import { Component, AfterViewInit, HostListener, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-rules-layout',
  standalone: true,
  templateUrl: './rules-layout.component.html',
  styleUrls: ['./rules-layout.component.css'],
  imports: [CommonModule]
})
export class RulesLayoutComponent implements AfterViewInit, OnInit {

  isMobileMenuOpen: boolean = true;
  mobileMenuVisible: boolean = true;

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

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const mobileMenuBtn = document.getElementById('mobileMenuBtn') as HTMLElement;
    const mobileMenu = document.getElementById('mobileMenu') as HTMLElement;

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();

        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        const target = document.querySelector(href || '') as HTMLElement;
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }

        if (mobileMenu) mobileMenu.classList.add('hidden');
      });
    });

    const tabButtons = document.querySelectorAll('.tab-button') as NodeListOf<HTMLElement>;
    const sections = document.querySelectorAll('.regulation-section') as NodeListOf<HTMLElement>;

    window.addEventListener('scroll', () => {
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id') || '';
        }
      });

      tabButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('href') === `#${current}`) {
          button.classList.add('active');
        }
      });
    });

    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.regulation-section').forEach(section => {
      observer.observe(section);
    });
  }

  navigateToTeams() { this.router.navigate(['/teams']); }
  navigateToHome() { this.router.navigate(['/']); }
  navigateToDrivers() { this.router.navigate(['/drivers']); }
  navigateToHistory() { this.router.navigate(['/history']); }
  navigateToRules() { this.router.navigate(['/rules']); }
  navigateToCareer() { this.router.navigate(['/career']); }
  navigateToLogin() { this.router.navigate(['/login']); }

  toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  // ✅ Controle do menu de usuário
  toggleUserMenu() { this.isUserMenuOpen = !this.isUserMenuOpen; }

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
}
