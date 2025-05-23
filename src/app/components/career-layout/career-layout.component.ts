import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-career-layout',
  templateUrl: './career-layout.component.html',
  styleUrls: ['./career-layout.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CareerLayoutComponent implements AfterViewInit, OnInit {
  @ViewChild('mobileMenuBtn') mobileMenuBtn!: ElementRef;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  mobileMenuVisible: boolean = true;

  isUserMenuOpen = false;
  user: User | null = null;

  isBrowser: boolean;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
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

    // Mobile menu toggle
    this.renderer.listen(this.mobileMenuBtn.nativeElement, 'click', () => {
      this.mobileMenu.nativeElement.classList.toggle('hidden');
    });

    // FAQ accordion (garante renderização completa)
    setTimeout(() => {
      const faqQuestions = this.el.nativeElement.querySelectorAll('.faq-question');
      faqQuestions.forEach((question: HTMLElement) => {
        this.renderer.listen(question, 'click', () => {
          const answer = question.nextElementSibling as HTMLElement;
          const icon = question.querySelector('i');

          if (answer) {
            const isHidden = answer.classList.contains('hidden');
            if (isHidden) {
              answer.classList.remove('hidden');
              icon?.classList.add('rotate-180');
            } else {
              answer.classList.add('hidden');
              icon?.classList.remove('rotate-180');
            }
          }
        });
      });
    });

    // Smooth scrolling for anchor links
    this.el.nativeElement.querySelectorAll('a[href^="#"]').forEach((anchor: HTMLElement) => {
      this.renderer.listen(anchor, 'click', (e: Event) => {
        e.preventDefault();
        const href = (anchor as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = this.el.nativeElement.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            this.mobileMenu.nativeElement.classList.add('hidden');
          }
        }
      });
    });

    // Highlight active tab
    const tabButtons = this.el.nativeElement.querySelectorAll('.tab-button');
    const sections = this.el.nativeElement.querySelectorAll('.regulation-section');

    this.renderer.listen(window, 'scroll', () => {
      let current = '';
      sections.forEach((section: HTMLElement) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id') || '';
        }
      });

      tabButtons.forEach((button: HTMLElement) => {
        button.classList.remove('active');
        if (button.getAttribute('href') === `#${current}`) {
          button.classList.add('active');
        }
      });
    });

    // Intersection Observer for animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedSections = this.el.nativeElement.querySelectorAll('.regulation-section');
    animatedSections.forEach((section: HTMLElement) => {
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

  toggleUserMenu() { this.isUserMenuOpen = !this.isUserMenuOpen; }

  navigateToSignup() {
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
