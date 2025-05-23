import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  Inject,
  PLATFORM_ID,
  HostListener
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
mobileMenuVisible = true;
  private currentIndex = 0;
  private totalSlides = 0;
  private carouselInterval!: number;
  private countdownInterval!: number;
  isBrowser: boolean;

  // Countdown
  days = '00';
  hours = '00';
  minutes = '00';
  seconds = '00';

  // User menu
  isUserMenuOpen = false;
  user: User | null = null;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
    private authService: AuthService,
    private el: ElementRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => this.user = u);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const carouselEl = this.el.nativeElement.querySelector('#carousel') as HTMLElement;
    if (!carouselEl) return;

    this.initializeCarousel(carouselEl);
    this.startCountdown(3);
  }

  private initializeCarousel(carousel: HTMLElement): void {
    const slides = carousel.querySelectorAll('.carousel-slide') as NodeListOf<HTMLElement>;
    const prevBtn = this.el.nativeElement.querySelector('#prevBtn') as HTMLElement | null;
    const nextBtn = this.el.nativeElement.querySelector('#nextBtn') as HTMLElement | null;
    const indicators = this.el.nativeElement.querySelectorAll('.carousel-indicator') as NodeListOf<HTMLElement>;

    this.totalSlides = slides.length;
    this.updateCarousel(carousel, indicators);

    this.carouselInterval = window.setInterval(
      () => this.nextSlide(carousel, indicators),
      8000
    );

    nextBtn?.addEventListener('click', () => {
      clearInterval(this.carouselInterval);
      this.nextSlide(carousel, indicators);
      this.carouselInterval = window.setInterval(
        () => this.nextSlide(carousel, indicators),
        8000
      );
    });

    prevBtn?.addEventListener('click', () => {
      clearInterval(this.carouselInterval);
      this.prevSlide(carousel, indicators);
      this.carouselInterval = window.setInterval(
        () => this.nextSlide(carousel, indicators),
        8000
      );
    });

    indicators.forEach((indicator: HTMLElement) => {
      indicator.addEventListener('click', () => {
        clearInterval(this.carouselInterval);
        this.currentIndex = parseInt(indicator.dataset['index']!, 10);
        this.updateCarousel(carousel, indicators);
        this.carouselInterval = window.setInterval(
          () => this.nextSlide(carousel, indicators),
          8000
        );
      });
    });
  }

  private updateCarousel(carousel: HTMLElement, indicators: NodeListOf<HTMLElement>): void {
    carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    indicators.forEach((el, idx) => {
      el.classList.toggle('bg-opacity-100', idx === this.currentIndex);
    });
  }

  private nextSlide(carousel: HTMLElement, indicators: NodeListOf<HTMLElement>): void {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel(carousel, indicators);
  }

  private prevSlide(carousel: HTMLElement, indicators: NodeListOf<HTMLElement>): void {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel(carousel, indicators);
  }

  private startCountdown(daysAhead: number): void {
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + daysAhead);
    countDownDate.setHours(20, 0, 0, 0);

    this.countdownInterval = window.setInterval(() => {
      const distance = countDownDate.getTime() - Date.now();
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

  // Navegações
  navigateToHome()    { this.router.navigate(['/home']); }
  navigateToTeams()   { this.router.navigate(['teams']); }
  navigateToDrivers() { this.router.navigate(['/drivers']); }
  navigateToHistory(){ this.router.navigate(['/history']); }
  navigateToRules()   { this.router.navigate(['/rules']); }
  navigateToCareer()  { this.router.navigate(['/career']); }
  toggleMobileMenu()  { this.mobileMenuVisible = !this.mobileMenuVisible; }

  // Menu de usuário
  toggleUserMenu()    { this.isUserMenuOpen = !this.isUserMenuOpen; }
  navigateToLogin()   { this.router.navigate(['/login']); this.isUserMenuOpen = false; }
  navigateToSignup()  { this.router.navigate(['/signup']); this.isUserMenuOpen = false; }
  logout()            { this.authService.logout(); this.router.navigate(['/home']); this.isUserMenuOpen = false; }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (!target.closest('.user-menu-container')) {
      this.isUserMenuOpen = false;
    }
  }
}
