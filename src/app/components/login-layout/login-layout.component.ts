import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ],
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(): void {
  if (this.username.trim() === '' || this.password.trim() === '') {
    alert('Please enter both username and password');
    return;
  }

  this.loading = true;

  this.authService.login(this.username, this.password).subscribe(users => {
    this.loading = false;
    if(users.length > 0) {
      alert(`Bem-vindo, ${users[0].name}!`);
      // redirecione para a página principal ou dashboard, por exemplo:
      this.router.navigate(['/dashboard']);
    } else {
      alert('Email ou senha inválidos!');
    }
  }, error => {
    this.loading = false;
    alert('Erro na conexão com o servidor');
  });
}

  navigateToSignup(){
    this.router.navigate(['/signup']);
  }
}
