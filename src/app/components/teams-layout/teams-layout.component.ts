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
export class TeamsLayoutComponent implements OnInit {

  constructor (private router: Router) {}
  isMobileMenuOpen: boolean = true;
  teams: Team[] = [];
  selectedTeam1: string = '';
  selectedTeam2: string = '';
  comparisonResult: string = '';

  ngOnInit(): void {
    this.teams = [
      { name: 'Red Bull Racing', points: 420, position: 2, wins: 6 },
      { name: 'Mercedes', points: 450, position: 1, wins: 8 },
      { name: 'Ferrari', points: 380, position: 3, wins: 3 },
      { name: 'McLaren', points: 320, position: 4, wins: 1 },
      { name: 'Aston Martin', points: 270, position: 5, wins: 0 },
      { name: 'Alpine', points: 230, position: 6, wins: 0 }
    ];
  }

  getTeam(name: string): Team | undefined {
    return this.teams.find(t => t.name === name);
  }

  compareTeams(teamName1: string, teamName2: string) {
    if (!teamName1 || !teamName2 || teamName1 === teamName2) {
      this.comparisonResult = '';
      return;
    }

    const team1 = this.getTeam(teamName1);
    const team2 = this.getTeam(teamName2);

    if (!team1 || !team2) {
      this.comparisonResult = 'Um ou ambos os times não foram encontrados.';
      return;
    }

    let result = `Comparação entre ${team1.name} e ${team2.name}:\n\n`;

    // Pontos
    if (team1.points > team2.points) {
      result += `${team1.name} tem mais pontos (${team1.points}) que ${team2.name} (${team2.points}).\n`;
    } else if (team2.points > team1.points) {
      result += `${team2.name} tem mais pontos (${team2.points}) que ${team1.name} (${team1.points}).\n`;
    } else {
      result += `Ambos têm a mesma quantidade de pontos (${team1.points}).\n`;
    }

    // Vitórias
    if (team1.wins > team2.wins) {
      result += `${team1.name} tem mais vitórias (${team1.wins}) que ${team2.name} (${team2.wins}).\n`;
    } else if (team2.wins > team1.wins) {
      result += `${team2.name} tem mais vitórias (${team2.wins}) que ${team1.name} (${team1.wins}).\n`;
    } else {
      result += `Ambos têm a mesma quantidade de vitórias (${team1.wins}).\n`;
    }

    // Posição
    if (team1.position < team2.position) {
      result += `${team1.name} está em melhor posição (${team1.position}) que ${team2.name} (${team2.position}).\n`;
    } else if (team2.position < team1.position) {
      result += `${team2.name} está em melhor posição (${team2.position}) que ${team1.name} (${team1.position}).\n`;
    } else {
      result += `Ambos estão na mesma posição (${team1.position}).\n`;
    }

    this.comparisonResult = result;
  }

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

toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  mobileMenuVisible(): boolean {
  return this.isMobileMenuOpen;
}

navigateToLogin(){
  this.router.navigate(['/login']);
}
}

