import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Driver {
    position: number;
    driver: string;
    team: string;
    points: number;
    wins: number;
    podiums: number;
    color: string;
}

interface DriverDetails {
    name: string;
    team: string;
    teamLogo: string;
    number: number;
    nationality: string;
    dob: string;
    debut: string;
    championships: number;
    wins: number;
    podiums: number;
    poles: number;
    fastestLaps: number;
    color: string;
    textColor: string;
}

@Component({
  selector: 'app-drivers-layout',
  templateUrl: './drivers-layout.component.html',
  styleUrls: ['./drivers-layout.component.css']
})
export class DriversLayoutComponent implements OnInit {
  mobileMenuVisible: boolean = false;
  driverStandingsData: Driver[] = [];
  driverDetails: { [key: string]: DriverDetails } = {};
  selectedDriver1: string = '';
  selectedDriver2: string = '';

  constructor( private router: Router) {
    this.driverStandingsData = [
      { position: 1, driver: 'Max Verstappen', team: 'Red Bull Racing', points: 454, wins: 19, podiums: 21, color: 'team-color-redbull' },
      { position: 2, driver: 'Sergio Perez', team: 'Red Bull Racing', points: 266, wins: 2, podiums: 9, color: 'team-color-redbull' },
      { position: 3, driver: 'Lewis Hamilton', team: 'Mercedes', points: 234, wins: 0, podiums: 6, color: 'team-color-mercedes' },
      { position: 4, driver: 'Fernando Alonso', team: 'Aston Martin', points: 206, wins: 0, podiums: 8, color: 'team-color-astonmartin' },
      { position: 5, driver: 'Charles Leclerc', team: 'Ferrari', points: 206, wins: 0, podiums: 6, color: 'team-color-ferrari' },
      { position: 6, driver: 'Carlos Sainz', team: 'Ferrari', points: 200, wins: 1, podiums: 3, color: 'team-color-ferrari' },
      { position: 7, driver: 'Lando Norris', team: 'McLaren', points: 205, wins: 0, podiums: 7, color: 'team-color-mclaren' },
      { position: 8, driver: 'George Russell', team: 'Mercedes', points: 175, wins: 0, podiums: 2, color: 'team-color-mercedes' },
      { position: 9, driver: 'Oscar Piastri', team: 'McLaren', points: 97, wins: 0, podiums: 2, color: 'team-color-mclaren' },
      { position: 10, driver: 'Lance Stroll', team: 'Aston Martin', points: 74, wins: 0, podiums: 0, color: 'team-color-astonmartin' }
    ];

    this.driverDetails = {
      verstappen: { name: 'Max Verstappen', team: 'Red Bull Racing', teamLogo: 'https://www.formula1.com/etc/designs/fom-website/images/teamlogos/red-bull-racing.svg', number: 1, nationality: 'Dutch', dob: '30/09/1997', debut: '2015 Australian GP', championships: 3, wins: 54, podiums: 98, poles: 32, fastestLaps: 30, color: 'bg-blue-900', textColor: 'text-blue-400' },
      perez: { name: 'Sergio Perez', team: 'Red Bull Racing', teamLogo: 'https://www.formula1.com/etc/designs/fom-website/images/teamlogos/red-bull-racing.svg', number: 11, nationality: 'Mexican', dob: '26/01/1990', debut: '2011 Australian GP', championships: 0, wins: 6, podiums: 36, poles: 3, fastestLaps: 11, color: 'bg-blue-900', textColor: 'text-blue-400' },
      hamilton: { name: 'Lewis Hamilton', team: 'Mercedes', teamLogo: 'https://www.formula1.com/etc/designs/fom-website/images/teamlogos/mercedes.svg', number: 44, nationality: 'British', dob: '07/01/1985', debut: '2007 Australian GP', championships: 7, wins: 103, podiums: 197, poles: 104, fastestLaps: 65, color: 'bg-teal-800', textColor: 'text-teal-400' },
      russell: { name: 'George Russell', team: 'Mercedes', teamLogo: 'https://www.formula1.com/etc/designs/fom-website/images/teamlogos/mercedes.svg', number: 63, nationality: 'British', dob: '15/02/1998', debut: '2019 Australian GP', championships: 0, wins: 1, podiums: 11, poles: 1, fastestLaps: 6, color: 'bg-teal-800', textColor: 'text-teal-400' },
      leclerc: { name: 'Charles Leclerc', team: 'Ferrari', teamLogo: 'https://www.formula1.com/etc/designs/fom-website/images/teamlogos/ferrari.svg', number: 16, nationality: 'Monegasque', dob: '16/10/1997', debut: '2018 Australian GP', championships: 0, wins: 5, podiums: 30, poles: 23, fastestLaps: 8, color: 'bg-red-600', textColor: 'text-red-400' },
      sainz: { name: 'Carlos Sainz', team: 'Ferrari', teamLogo: 'https://www.formula1.com/etc/designs/fom-website/images/teamlogos/ferrari.svg', number: 55, nationality: 'Spanish', dob: '01/09/1994', debut: '2015 Australian GP', championships: 0, wins: 2, podiums: 18, poles: 5, fastestLaps: 3, color: 'bg-red-600', textColor: 'text-red-400' }
    };
  }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  updateDriverComparison(): void {
    if (this.selectedDriver1 && this.selectedDriver2) {
      // Logic to update driver comparison
      const driver1Data = this.driverDetails[this.selectedDriver1];
      const driver2Data = this.driverDetails[this.selectedDriver2];

      // Here you would typically update the UI with the driver data
      // For example, you could set properties to bind to the template
      // this.driver1Details = driver1Data;
      // this.driver2Details = driver2Data;

      // Logic to render comparison chart can be added here
    }
  }

  onDriver1Change(driver: string): void {
    this.selectedDriver1 = driver;
    this.updateDriverComparison();
  }

  onDriver2Change(driver: string): void {
    this.selectedDriver2 = driver;
    this.updateDriverComparison();
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

}

