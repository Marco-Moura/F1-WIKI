import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rules-layout',
  templateUrl: './rules-layout.component.html',
  styleUrls: ['./rules-layout.component.css']
})
export class RulesLayoutComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn') as HTMLElement;
    const mobileMenu = document.getElementById('mobileMenu') as HTMLElement;

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();

        const href = (anchor as HTMLAnchorElement).getAttribute('href');  // Acesso correto ao href
        const target = document.querySelector(href || '') as HTMLElement;
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }

        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
      });
    });

    // Highlight active tab
    const tabButtons = document.querySelectorAll('.tab-button') as NodeListOf<HTMLElement>;
    const sections = document.querySelectorAll('.regulation-section') as NodeListOf<HTMLElement>;

    window.addEventListener('scroll', () => {
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

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

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1
    };

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

  
  constructor(private router: Router) {}

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
}
