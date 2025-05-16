import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./login.component.css'] // ajuste se usar outro arquivo de estilo
})
export class LoginComponent implements OnInit {
loginForm!: FormGroup;
  loading = false;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.error) {
          alert('Erro: ' + res.error);
        } else {
          alert('Bem-vindo ' + (res.fullname || 'Usuário') + '!');
          // Aqui você pode redirecionar, salvar token, etc
        }
      },
      error: (err) => {
        this.loading = false;
        alert('Erro na requisição: ' + err.message);
      }
    });
  }
}
