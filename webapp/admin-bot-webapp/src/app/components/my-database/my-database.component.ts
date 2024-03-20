import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TelegramService} from "../core/services/telegram/telegram.service";

@Component({
  selector: 'app-my-database',
  templateUrl: './my-database.component.html',
  styleUrl: './my-database.component.scss'
})
export class MyDatabaseComponent implements OnInit{

  constructor(private router: Router, private telegramService: TelegramService) {
    this.goBack = this.goBack.bind(this);
  }

  ngOnInit() {
    this.telegramService.BackButton.show();
    this.telegramService.BackButton.onClick(this.goBack);
  }

  goBack(){
    this.router.navigate(['']);
  }

  navigateToMyTokens() {
    this.router.navigate(['/my-tokens-stats/main-page'])
  }

  navigateToMyChannels() {
    this.router.navigate(['/my-channels-stats/main-page'])
  }
}
