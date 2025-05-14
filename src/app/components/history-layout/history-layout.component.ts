import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-layout',
  templateUrl: './history-layout.component.html',
  styleUrls: ['./history-layout.component.css'] // Corrigido de styleUrl para styleUrls
})
export class HistoryLayoutComponent implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.initializeMobileMenu();
    this.initializeDecadeTabs();
    this.initializeStatsAnimation();
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
        // Remove active class from all tabs
        decadeTabs.forEach(t => t.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all decade contents
        decadeContents.forEach(content => content.classList.add('hidden'));

        // Show selected decade content
        const decade = tab.getAttribute('data-decade');
        const selectedContent = document.querySelector(`.decade-content[data-decade="${decade}"]`) as HTMLElement;
        if (selectedContent) {
          selectedContent.classList.remove('hidden');
        }
      });
    });

    // Set 1950s as active by default
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

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');

          // If it's the stats section, animate the bars
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



  navigateToTeams() {
  this.router.navigate(['teams']); // Substitua '/teams' pela rota correta se necessário
  }

  navigateToHome() {
  this.router.navigate(['/']); // Substitua pela rota correta para a página inicial
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

