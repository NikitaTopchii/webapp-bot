import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-webapp',
  templateUrl: './user-webapp.component.html',
  styleUrl: './user-webapp.component.scss'
})
export class UserWebappComponent {

  constructor(private router: Router) {
  }

  navigateToCompetitions() {
    this.router.navigate(['/user-webapp/user-competitions'])
  }

  navigateToStores() {

  }

  navigateBotStore() {
    this.router.navigate(['/user-webapp/bot-store'])
  }
}
