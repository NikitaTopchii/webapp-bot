import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {LanguageSelectorComponent} from "./language-selector/language-selector.component";
import {UserService} from "./core/services/user/user.service";

@Component({
  selector: 'app-main-admin-page',
  templateUrl: './admin-webapp.component.html',
  styleUrl: './admin-webapp.component.scss'
})
export class AdminWebappComponent{

  data: any;
  constructor(private router: Router) {
  }

  navigateToAdminsList() {
    this.router.navigate(['/admins'])
  }
  navigateToCompetitionCreator() {
    this.router.navigate(['/competitions/competition-creator'])
  }

  navigateToCompetitionsList() {
    this.router.navigate(['/news-letter/main'])
  }

  navigateToTokensPage() {
    this.router.navigate(['/my-tokens/tokens'])
  }

  navigateToCompetitionList() {
    this.router.navigate(['/competitions/select-competition-list']);
  }

  navigateToStore() {
    this.router.navigate(['/store']);
  }

  navigateToMyDatabase() {
    this.router.navigate(['/my-database/main']);
  }

  navigateToChatGuard() {
    this.router.navigate(['/chatguard/chat-selector']);
  }
}
