import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../components/core/services/user/user.service";
import {map} from "rxjs";

type User = {
  userId: string,
  userLanguage: string,
  userStatus: 'isAdmin' | 'isUser',
  userSubscribeStatus: boolean
}
@Component({
  selector: 'app-base-webapp',
  standalone: true,
  imports: [],
  templateUrl: './base-webapp.component.html',
  styleUrl: './base-webapp.component.scss'
})
export class BaseWebappComponent implements OnInit{

  private userId: string = '';
  private currentUser: User = {
    userId: '',
    userLanguage: '',
    userStatus: 'isUser',
    userSubscribeStatus: false
  };
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.getUserId();
  }

  ngOnInit() {
    this.getUserDataById();
  }

  getUserId(){
    const userIdByLocalStorage = localStorage.getItem('user_id') || '';

    let userIdByParams = '';
    let botId = '';

    this.activatedRoute.queryParams.subscribe(params => {
      userIdByParams = params['userid'];
      botId = params['botid'] || localStorage.getItem('botid');
    });

    if(userIdByParams){
      this.userId = userIdByParams;
      localStorage.setItem('user_id', this.userId);
    } else {
      this.userId = userIdByLocalStorage;
    }

    localStorage.setItem('botid', botId);
  }

  getUserDataById(){
    this.userService.getUser(this.userId).subscribe((response) => {
      this.currentUser = {
        userId: response.userid,
        userLanguage: response.language,
        userStatus: response.is_admin === 0 ? 'isUser' : 'isAdmin',
        userSubscribeStatus: response.subscription !== ''
      }

      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      this.recognizeUserType(this.currentUser);
    })
  }

  recognizeUserType(user: User){
    if(user.userStatus === 'isAdmin' && user.userSubscribeStatus){
      this.router.navigate(['/admin-webapp']);
    } else if (user.userStatus === 'isAdmin'){
      this.router.navigate(['/admin-webapp']);
    } else {
      this.router.navigate(['/user-webapp'])
    }
  }
}
