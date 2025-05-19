import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-drivers-layout',
  templateUrl: './drivers-layout.component.html',
  styleUrls: ['./drivers-layout.component.css'],
  imports: [CommonModule]
})
export class DriversLayoutComponent {
  mobileMenuVisible: boolean = true;

  constructor( private router: Router) {}
  
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

navigateToLogin(){
  this.router.navigate(['/login']);
}

toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}

