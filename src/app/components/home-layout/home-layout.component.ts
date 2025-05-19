import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
  imports: [CommonModule]
})
export class HomeLayoutComponent implements AfterViewInit, OnInit {
  mobileMenuVisible: boolean = true;
  private currentIndex: number = 0;
  private totalSlides: number = 0;
  private interval: any;

  constructor(private router: Router) {}

  ngOnInit(): void{}

  ngAfterViewInit() {
    // Verifica se o objeto document está disponível
    if (typeof document !== 'undefined') {
      this.initializeCarousel();
      this.updateCountdown();
    }
  }

  private initializeCarousel(): void {
    const carousel = document.getElementById('carousel') as HTMLElement;
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
    const indicators = document.querySelectorAll('.carousel-indicator');

    this.totalSlides = slides.length;

    // Set initial position
    this.updateCarousel(carousel, indicators);

    // Event listeners
    nextBtn.addEventListener('click', () => {
      clearInterval(this.interval);
      this.nextSlide(carousel, indicators);
      this.interval = setInterval(() => this.nextSlide(carousel, indicators), 10000);
    });

    prevBtn.addEventListener('click', () => {
      clearInterval(this.interval);
      this.prevSlide(carousel, indicators);
      this.interval = setInterval(() => this.nextSlide(carousel, indicators), 10000);
    });

    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        clearInterval(this.interval);
        this.currentIndex = parseInt(indicator.getAttribute('data-index') || '0', 10);
        this.updateCarousel(carousel, indicators);
        this.interval = setInterval(() => this.nextSlide(carousel, indicators), 10000);
      });
    });
  }

  private updateCarousel(carousel: HTMLElement, indicators: NodeListOf<Element>): void {
    carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;

    indicators.forEach((indicator, index) => {
      if (index === this.currentIndex) {
        indicator.classList.add('bg-opacity-100');
      } else {
        indicator.classList.remove('bg-opacity-100');
      }
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

  private updateCountdown(): void {
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 5); // Exemplo: 5 dias a partir de agora
    countDownDate.setHours(20, 0, 0, 0); // Definido para 20:00

    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("countdown-days")!.innerHTML = days.toString().padStart(2, '0');
      document.getElementById("countdown-hours")!.innerHTML = hours.toString().padStart(2, '0');
document.getElementById("countdown-minutes")!.innerHTML = minutes.toString().padStart(2, '0');
      document.getElementById("countdown-seconds")!.innerHTML = seconds.toString().padStart(2, '0');
      // Se a contagem regressiva terminar, exibe "00"
      if (distance < 0) {
        clearInterval(this.interval);
        document.getElementById("countdown-days")!.innerHTML = "00";
        document.getElementById("countdown-hours")!.innerHTML = "00";
        document.getElementById("countdown-minutes")!.innerHTML = "00";
        document.getElementById("countdown-seconds")!.innerHTML = "00";
      }
    }, 1000);
  }
  // Função para navegar até a página "Teams"
  navigateToTeams() {
    this.router.navigate(['teams']); // Substitua '/teams' pela rota correta se necessário
  }
  navigateToHome() {
  this.router.navigate(['/home']); // Substitua pela rota correta para a página inicial
}
navigateToDrivers() {
  this.router.navigate(['/drivers']); // Substitua pela rota correta para a página de drivers
}
navigateToHistory() {
  this.router.navigate(['/history']);
}

navigateToRules() {
  this.router.navigate(['/rules']); // Substitua pela rota correta para a página de regras
}
navigateToCareer() {
  this.router.navigate(['/career'])
}

navigateToLogin(){
  this.router.navigate(['/login']);
}

toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}