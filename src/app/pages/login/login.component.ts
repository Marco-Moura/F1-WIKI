import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.username || !this.password) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.error) {
          this.errorMessage = response.error;
          this.loading = false;
        } else {
          // Armazene os dados se necessário (ex: token, nome)
          localStorage.setItem('user', JSON.stringify({
            fullname: response.fullname,
            email: response.email
          }));

          // Redirecionar para o dashboard ou homepage
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.errorMessage = err?.error?.error || 'Login failed. Try again.';
        this.loading = false;
      }
    });
  }

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }

  navigateToHome(){
    this.router.navigate(['/home']);
  }
}
