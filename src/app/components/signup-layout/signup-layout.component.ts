import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-layout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup-layout.component.html',
  styleUrls: ['./signup-layout.component.css']
})
export class SignupLayoutComponent implements OnInit {
  signupForm!: FormGroup;
  loading = false;

  passwordVisible = false;
  confirmPasswordVisible = false;

  // Classes para os 4 níveis da barra de força da senha
  strengthBarClasses: string[] = ['', '', '', ''];

  constructor(private router: Router,private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        fullname: ['', [Validators.required, Validators.minLength(3)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      {
        validator: this.passwordsMatchValidator,
      }
    );
  }

  // Validador customizado para garantir que senha e confirmação batem
  passwordsMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { passwordsMismatch: true };
  }

  // Toggle visibilidade das senhas
  togglePassword(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  // Checa força da senha e atualiza a barra visual
  checkPasswordStrength() {
    const password = this.signupForm.get('password')?.value || '';

    // Simples avaliação: +1 ponto para cada condição
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[\W]/.test(password)) strength++;

    // Atualiza classes para a barra (exemplo usando cores do Tailwind)
    this.strengthBarClasses = this.strengthBarClasses.map((_, i) =>
      i < strength ? 'bg-red-600' : ''
    );
  }

  // Submit do formulário
  onSubmit() {
  if (this.signupForm.invalid) {
    this.signupForm.markAllAsTouched();
    return;
  }

  this.loading = true;

  this.authService.register(this.signupForm.value).subscribe({
    next: () => {
      this.loading = false;
      alert('Conta criada com sucesso! 🎉');
      this.signupForm.reset();
    },
    error: (err) => {
      this.loading = false;
      alert('Erro ao criar conta: ' + err.message);
    }
  });
}

  // Navegar para a tela de login (implemente sua lógica)
  navigateToLogin() {
    // Exemplo: usar Angular Router para navegação
    this.router.navigate(['/login']);
  }
}