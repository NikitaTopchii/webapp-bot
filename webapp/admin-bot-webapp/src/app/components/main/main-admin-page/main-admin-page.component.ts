import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {LanguageSelectorComponent} from "../../language-selector/language-selector.component";
import {UserService} from "../../core/services/user/user.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";
import {response} from "express";

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

  telegram = inject(TelegramService);
  userService = inject(UserService);
  adminsService = inject(AdminsListService);

  data: any;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.telegram.BackButton.hide();
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

  setAdminRole(userId: any){
    const formData = new FormData();

    formData.append('id', userId);

    this.adminsService.getAdmin(formData).subscribe((response) => {
      const admin = response.results;

      localStorage.setItem('user_id', admin[0].userid);
    })
  }

  navigateToAdminsList() {
    this.router.navigate(['/active-competition'])
  }
  navigateToCompetitionCreator() {
    this.router.navigate(['/channels-list'])
  }

  ngOnInit() {
    this.getUser();
  }

  navigateToCompetitionsList() {
    this.router.navigate(['/my-competitions'])
  }
}
