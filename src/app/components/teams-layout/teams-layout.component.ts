import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Interface para o time
interface Team {
  name: string;
  points: number;
  position: number;
  wins: number;
  // Pode ter mais dados como pilotos, país, etc
}

@Component({
  selector: 'app-teams-layout',
  imports: [CommonModule,ReactiveFormsModule, FormsModule],
  templateUrl: './teams-layout.component.html',
  styleUrl: './teams-layout.component.css'
})
export class TeamsLayoutComponent {

    mobileMenuVisible: boolean = true;


  constructor (private router: Router) {}
  isMobileMenuOpen: boolean = true;

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

toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
  
navigateToLogin(){
  this.router.navigate(['/login']);
}


   mostrarComparacao = false;

  selectedTeam1: any = null;
  selectedTeam2: any = null;

  teams = [
  {
    name: 'Red Bull Racing',
    teamPrincipal: 'Christian Horner',
    engine: 'Honda RBPT',
    firstEntry: 2005,
    titles: 6,
    drivers: ['Max Verstappen', 'Sergio Perez']
  },
  {
    name: 'Mercedes',
    teamPrincipal: 'Toto Wolff',
    engine: 'Mercedes',
    firstEntry: 1970,
    titles: 8,
    drivers: ['Lewis Hamilton', 'George Russell']
  },
  {
    name: 'Ferrari',
    teamPrincipal: 'Frédéric Vasseur',
    engine: 'Ferrari',
    firstEntry: 1950,
    titles: 16,
    drivers: ['Charles Leclerc', 'Carlos Sainz']
  },
  {
    name: 'McLaren',
    teamPrincipal: 'Andrea Stella',
    engine: 'Mercedes',
    firstEntry: 1966,
    titles: 8,
    drivers: ['Lando Norris', 'Oscar Piastri']
  },
  {
    name: 'Haas F1 Team',
    teamPrincipal: 'Guenther Steiner',
    engine: 'Ferrari',
    firstEntry: 2016,
    titles: 0,
    drivers: ['Kevin Magnussen', 'Nico Hülkenberg']
  },
  {
    name: 'AlphaTauri',
    teamPrincipal: 'Franz Tost',
    engine: 'Red Bull',
    firstEntry: 1985,
    titles: 0,
    drivers: ['Yuki Tsunoda', 'Daniel Ricciardo']
  },
  {
    name: 'Williams',
    teamPrincipal: 'James Vowles',
    engine: 'Mercedes',
    firstEntry: 1977,
    titles: 9,
    drivers: ['Alexander Albon', 'Logan Sargeant']
  },
  {
    name: 'Aston Martin',
    teamPrincipal: 'Mike Krack',
    engine: 'Mercedes',
    firstEntry: 1959,
    titles: 0,
    drivers: ['Fernando Alonso', 'Lance Stroll']
  },
  {
    name: 'Alpine',
    teamPrincipal: 'Bruno Famin',
    engine: 'Renault',
    firstEntry: 1981,
    titles: 2,
    drivers: ['Esteban Ocon', 'Pierre Gasly']
  }
];
}

