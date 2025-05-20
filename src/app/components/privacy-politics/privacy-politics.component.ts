import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-politics',
  imports: [],
  templateUrl: './privacy-politics.component.html',
  styleUrl: './privacy-politics.component.css'
})
export class PrivacyPoliticsComponent {

  constructor( private router: Router){}

  navigateToSignup(){
    this.router.navigate(['/signup']);
  }
}
