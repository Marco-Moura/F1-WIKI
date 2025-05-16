import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [CommonModule,ReactiveFormsModule,FormsModule]
})
export class SignupComponent {
signupForm!: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  // Validator customizado para conferir se as senhas coincidem
  passwordsMatch(group: AbstractControl): { [key: string]: boolean } | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  onSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { fullname, email, password } = this.signupForm.value;

    this.authService.signup(fullname, email, password).subscribe({
      next: () => {
        this.loading = false;
        alert('Conta criada com sucesso! Você pode fazer login agora.');
        this.signupForm.reset();
      },
      error: (err) => {
        this.loading = false;
        alert('Erro ao criar conta: ' + err.message);
      }
    });
  }
}
