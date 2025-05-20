import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule,]
})
export class SignupComponent {
  signupForm: FormGroup;
  loading = false;
  passwordVisible = false;
  confirmPasswordVisible = false;
  strengthBarClasses: string[] = ['bg-gray-700', 'bg-gray-700', 'bg-gray-700', 'bg-gray-700'];
  errorMessage: string | null = null;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private http: HttpClient) {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    }, { validators: this.passwordsMatchValidator });
  }

  togglePassword(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  checkPasswordStrength(): void {
    const password = this.signupForm.get('password')?.value || '';
    const strength = this.getPasswordStrength(password);
    this.strengthBarClasses = ['bg-gray-700', 'bg-gray-700', 'bg-gray-700', 'bg-gray-700'];

    for (let i = 0; i < strength; i++) {
      this.strengthBarClasses[i] = ['bg-red-600', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'][i];
    }
  }

  getPasswordStrength(password: string): number {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  }

  onSubmit(): void {
  if (this.signupForm.invalid) {
    return;
  }

  this.loading = true;
  this.errorMessage = null;

 this.authService.signup(
  this.signupForm.value.fullname,
  this.signupForm.value.email,
  this.signupForm.value.password
).subscribe({
  next: () => {
    this.loading = false;
    this.router.navigate(['/login']);
  },
  error: (err) => {
    this.loading = false;
    this.errorMessage = err.error?.message || 'Erro ao criar conta';
  }
});



}

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToTerms(){
    this.router.navigate(['/Termos-Serviço'])
  }
}
