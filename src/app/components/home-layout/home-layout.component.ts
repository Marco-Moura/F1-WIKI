import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
  imports: [CommonModule]
})
export class HomeLayoutComponent implements OnInit, AfterViewInit {
  mobileMenuVisible = true;
  private currentIndex = 0;
  private totalSlides = 0;
  private carouselInterval: any;
  private countdownInterval: any;

  isBrowser: boolean;

  // countdown
  days = '00';
  hours = '00';
  minutes = '00';
  seconds = '00';

  // user menu
  isUserMenuOpen = false;
  user: User | null = null;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    private authService: AuthService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => this.user = u);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const carousel = this.el.nativeElement.querySelector('.carousel');
    if (carousel) {
      this.renderer.setStyle(carousel, 'display', 'block');
      this.initializeCarousel();
    }

    this.startCountdown(3);
  }

  private initializeCarousel(): void {
    const carousel = document.getElementById('carousel') as HTMLElement;
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
    const indicators = document.querySelectorAll('.carousel-indicator');

    this.totalSlides = slides.length;
    this.updateCarousel(carousel, indicators);

    this.carouselInterval = setInterval(() => this.nextSlide(carousel, indicators), 10000);

    nextBtn.addEventListener('click', () => {
      clearInterval(this.carouselInterval);
      this.nextSlide(carousel, indicators);
      this.carouselInterval = setInterval(() => this.nextSlide(carousel, indicators), 10000);
    });

    prevBtn.addEventListener('click', () => {
      clearInterval(this.carouselInterval);
      this.prevSlide(carousel, indicators);
      this.carouselInterval = setInterval(() => this.nextSlide(carousel, indicators), 10000);
    });

    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        clearInterval(this.carouselInterval);
        this.currentIndex = parseInt(indicator.getAttribute('data-index') || '0', 10);
        this.updateCarousel(carousel, indicators);
        this.carouselInterval = setInterval(() => this.nextSlide(carousel, indicators), 10000);
      });
    });
  }

  private updateCarousel(carousel: HTMLElement, indicators: NodeListOf<Element>): void {
    carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('bg-opacity-100', index === this.currentIndex);
    });
  }

  private nextSlide(carousel: HTMLElement, indicators: NodeListOf<Element>): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel(carousel, indicators);
  }

  private prevSlide(carousel: HTMLElement, indicators: NodeListOf<Element>): void {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel(carousel, indicators);
  }

  private startCountdown(daysAhead: number): void {
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + daysAhead);
    countDownDate.setHours(20, 0, 0, 0);

    this.countdownInterval = setInterval(() => {
      const now = Date.now();
      const distance = countDownDate.getTime() - now;

      if (distance < 0) {
        clearInterval(this.countdownInterval);
        this.days = this.hours = this.minutes = this.seconds = '00';
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      this.days    = String(d).padStart(2, '0');
      this.hours   = String(h).padStart(2, '0');
      this.minutes = String(m).padStart(2, '0');
      this.seconds = String(s).padStart(2, '0');
    }, 1000);
  }

  // navegações
  navigateToTeams() { this.router.navigate(['teams']); }
  navigateToHome()  { this.router.navigate(['/home']); }
  navigateToDrivers() { this.router.navigate(['/drivers']); }
  navigateToHistory() { this.router.navigate(['/history']); }
  navigateToRules()   { this.router.navigate(['/rules']); }
  navigateToCareer()  { this.router.navigate(['/career']); }
  toggleMobileMenu(): void { this.mobileMenuVisible = !this.mobileMenuVisible; }
  nnavigateToSignup(): void { this.router.navigate(['/signup']); }

  // menu de usuário
  toggleUserMenu() { this.isUserMenuOpen = !this.isUserMenuOpen; }
  navigateToLogin() { this.router.navigate(['/login']); this.isUserMenuOpen = false; }
  navigateToSignup() { this.router.navigate(['/signup']); this.isUserMenuOpen = false; }
  logout() { this.authService.logout(); this.router.navigate(['/home']); this.isUserMenuOpen = false; }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (!target.closest('.user-menu-container')) {
      this.isUserMenuOpen = false;
    }
  }
}