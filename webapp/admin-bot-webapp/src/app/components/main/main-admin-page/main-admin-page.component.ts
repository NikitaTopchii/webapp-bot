import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-admin-page',
  standalone: true,
  imports: [],
  templateUrl: './main-admin-page.component.html',
  styleUrl: './main-admin-page.component.scss'
})
export class MainAdminPageComponent {

  constructor(private router: Router) {
  }

  navigateToAdminsList() {
    this.router.navigate(['/admins-list'])
  }

  navigateToChannelsList() {
    this.router.navigate(['/channels-list'])
  }

  navigateToChatsList() {
    this.router.navigate(['/chats-list'])
  }
}
