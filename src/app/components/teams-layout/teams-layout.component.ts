import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-layout',
  imports: [],
  templateUrl: './teams-layout.component.html',
  styleUrl: './teams-layout.component.css'
})
export class TeamsLayoutComponent {

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
