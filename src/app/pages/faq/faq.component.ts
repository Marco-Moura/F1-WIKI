// faq.component.ts

import {
  Component,
  AfterViewInit,
  ElementRef,
  Renderer2
} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule]
})
export class FAQComponent implements AfterViewInit {
loggedIn = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pega estado de login
    this.loggedIn = this.auth.isLoggedIn();
  }

  ngAfterViewInit(): void {
    // Se não estiver logado, não inicializa listener do form
    if (!this.loggedIn) {
      return;
    }

    // FAQ Accordion functionality
    const faqButtons = this.el.nativeElement
      .querySelectorAll('.faq-item') as NodeListOf<HTMLElement>;
    
    faqButtons.forEach(button => {
      this.renderer.listen(button, 'click', () => {
        const faqItem = button.parentElement as HTMLElement;
        const content = button.nextElementSibling as HTMLElement;
        
        button.classList.toggle('active');
        if (content.style.display === 'block') {
          content.style.display = 'none';
          faqItem.classList.remove('bg-gray-50');
        } else {
          content.style.display = 'block';
          faqItem.classList.add('bg-gray-50');
        }
        
        faqButtons.forEach(otherButton => {
          if (otherButton !== button) {
            otherButton.classList.remove('active');
            (otherButton.nextElementSibling as HTMLElement).style.display = 'none';
            otherButton.parentElement?.classList.remove('bg-gray-50');
          }
        });
      });
    });

    // Tab functionality
    const tabButtons = this.el.nativeElement
      .querySelectorAll('.tab-button') as NodeListOf<HTMLElement>;
    const tabContents = this.el.nativeElement
      .querySelectorAll('.tab-content') as NodeListOf<HTMLElement>;

    tabButtons.forEach(button => {
      this.renderer.listen(button, 'click', () => {
        const tabId = button.getAttribute('data-tab');
        if (!tabId) return;

        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        tabContents.forEach(content => content.classList.add('hidden'));
        const selected = this.el.nativeElement.querySelector(`#${tabId}`) as HTMLElement | null;
        if (selected) {
          selected.classList.remove('hidden');
        }
      });
    });

    // Comment form submission
    const commentFormEl = this.el.nativeElement
      .querySelector('#comment-form') as HTMLFormElement | null;
    if (commentFormEl) {
      this.renderer.listen(commentFormEl, 'submit', (e: Event) => {
        e.preventDefault();

        const nameInputEl = this.el.nativeElement
          .querySelector('#name') as HTMLInputElement | null;
        const commentInputEl = this.el.nativeElement
          .querySelector('#comment') as HTMLTextAreaElement | null;

        const name = nameInputEl?.value || '';
        const commentText = commentInputEl?.value || '';

        if (name && commentText) {
          alert('Comment submitted successfully!');
          commentFormEl.reset();
        } else {
          alert('Please fill in all fields');
        }
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}