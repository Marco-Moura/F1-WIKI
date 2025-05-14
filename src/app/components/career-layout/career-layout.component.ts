import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career-layout',
  templateUrl: './career-layout.component.html',
  styleUrls: ['./career-layout.component.css']
})
export class CareerLayoutComponent implements AfterViewInit {
  @ViewChild('mobileMenuBtn') mobileMenuBtn!: ElementRef;
  @ViewChild('mobileMenu') mobileMenu!: ElementRef;

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Mobile menu toggle
    this.renderer.listen(this.mobileMenuBtn.nativeElement, 'click', () => {
      this.mobileMenu.nativeElement.classList.toggle('hidden');
    });

    // FAQ accordion
    this.el.nativeElement.querySelectorAll('.faq-question').forEach((question: HTMLElement) => {
      this.renderer.listen(question, 'click', () => {
        const answer = question.nextElementSibling as HTMLElement;
        const icon = question.querySelector('i');
        answer?.classList.toggle('hidden');
        icon?.classList.toggle('rotate-180');
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
        const sectionHeight = section.clientHeight;

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

    sections.forEach((section: HTMLElement) => {
      observer.observe(section);
    });
  }

  navigateToTeams() {
    this.router.navigate(['teams']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToDrivers() {
    this.router.navigate(['/drivers']);
  }

  navigateToHistory() {
    this.router.navigate(['/history']);
  }

  navigateToRules() {
    this.router.navigate(['/rules']);
  }

  navigateToCareer() {
    this.router.navigate(['/career']);
  }
}