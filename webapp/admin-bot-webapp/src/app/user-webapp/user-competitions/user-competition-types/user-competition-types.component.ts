import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-competition-types',
  standalone: true,
  imports: [],
  templateUrl: './user-competition-types.component.html',
  styleUrl: './user-competition-types.component.scss'
})
export class UserCompetitionTypesComponent {

  constructor(private router: Router) {
  }

  navigateToCanParticipate() {
    this.router.navigate(['/user-competitions/can-participate'])
  }

  navigateToParticipating() {
    this.router.navigate(['/user-competitions/participating'])
  }

  navigateToWasParticipant() {
    this.router.navigate(['/user-competitions/was-participant'])
  }
}
