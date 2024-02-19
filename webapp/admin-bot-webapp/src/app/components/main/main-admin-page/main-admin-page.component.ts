import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {UserService} from "../../core/services/user/user.service";
import {LanguageSelectorComponent} from "../../language-selector/language-selector.component";
import {AdminsListService} from "../../core/services/admins/admins-list.service";
import {response} from "express";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-main-admin-page',
  standalone: true,
  imports: [
    LanguageSelectorComponent,
    MatButton
  ],
  templateUrl: './main-admin-page.component.html',
  styleUrl: './main-admin-page.component.scss'
})
export class MainAdminPageComponent implements OnInit{

  data: any;
  constructor(private route: ActivatedRoute, private router: Router, private usersService: UserService) {
    const userIdByLocalStorage = localStorage.getItem('user_id');

    let userIdByParams = '';
    let botId = '';

    this.route.queryParams.subscribe(params => {
      userIdByParams = params['userid'];
      botId = params['botid'] || localStorage.getItem('botid');
    });

    if(userIdByParams){
      this.data = userIdByParams;
    } else {
      this.data = userIdByLocalStorage;
    }

    localStorage.setItem('botid', botId);
  }

  getUser() {
    localStorage.setItem('user_id', this.data);

    const formData = new FormData();

    formData.append('userid', this.data);

    this.usersService.getUser(formData).subscribe((response) => {
      const timezone = response.results[0].timezone;
      localStorage.setItem('timezone', timezone);
    })
  }

  navigateToAdminsList() {
    this.router.navigate(['/admins'])
  }
  navigateToCompetitionCreator() {
    this.router.navigate(['/competitions/competition-creator'])
  }

  ngOnInit() {
    this.getUser();
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

  navigateToJointCompetitionCreator() {
    this.router.navigate(['/competitions/joint-competition-creator'])
  }
}
