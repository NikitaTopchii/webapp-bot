import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {UserService} from "../../core/services/user/user.service";
import {LanguageSelectorComponent} from "../../language-selector/language-selector.component";
import {AdminsListService} from "../../core/services/admins/admins-list.service";

@Component({
  selector: 'app-main-admin-page',
  standalone: true,
  imports: [
    LanguageSelectorComponent
  ],
  templateUrl: './main-admin-page.component.html',
  styleUrl: './main-admin-page.component.scss'
})
export class MainAdminPageComponent implements OnInit{

  data: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    const userIdByLocalStorage = localStorage.getItem('user_id');

    let userIdByParams = '';
    let botId = '';

    this.route.queryParams.subscribe(params => {
      userIdByParams = params['userid'];
      botId = params['botid'];
    });

    if(userIdByParams){
      this.data = userIdByParams;
    } else {
      this.data = userIdByLocalStorage;
    }

    localStorage.setItem('botid', botId);
    // if(userId){
    //   this.data = userId;
    // } else {
    //   this.route.queryParams.subscribe(params => {
    //     this.data = params['userid'];
    //   });
    // }
  }

  getUser() {
    localStorage.setItem('user_id', this.data);

    // this.userService.getUser(formData).subscribe((response) => {
    //   const user = response.results;
    //
    //   console.log(user[0])
    //   console.log(user.userid)
    //
    //   this.setAdminRole(user[0].userid);
    // });
  }

  navigateToAdminsList() {
    this.router.navigate(['/active-competition'])
  }
  navigateToCompetitionCreator() {
    this.router.navigate(['/competitions/competition-endpoint-selector'])
  }

  ngOnInit() {
    this.getUser();
  }

  navigateToCompetitionsList() {
    this.router.navigate(['/news-letter/channels-with-competitions'])
  }
}
