import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-database',
  templateUrl: './my-database.component.html',
  styleUrl: './my-database.component.scss'
})
export class MyDatabaseComponent {

  constructor(private router: Router) {
  }

  navigateToMyTokens() {
    this.router.navigate(['/my-tokens-stats/main-page'])
  }

  navigateToMyChannels() {
    this.router.navigate(['/my-channels-stats/main-page'])
  }
}
