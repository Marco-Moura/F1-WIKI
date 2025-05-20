import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-terms',
  imports: [],
  templateUrl: './services-terms.component.html',
  styleUrl: './services-terms.component.css'
})
export class ServicesTermsComponent {

  constructor(private router: Router){}

  navigateToPolytics(){
    this.router.navigate(['/Politicas-Privacidade'])
  }
}
