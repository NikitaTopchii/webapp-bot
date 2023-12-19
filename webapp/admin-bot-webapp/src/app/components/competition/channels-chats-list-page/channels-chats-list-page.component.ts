import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TelegramEntityInterface} from "../../core/telegram-entity.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-channels-chats-list-page',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './channels-chats-list-page.component.html',
  styleUrl: './channels-chats-list-page.component.scss'
})
export class ChannelsChatsListPageComponent {

   private telegramEntityList: TelegramEntityInterface[] = [
     {
       id: '1',
       name: 'Dota2',
       type: "channel"
     },
     {
       id: '2',
       name: 'Rockstar',
       type: "channel"
     },
     {
       id: '3',
       name: 'Rockstar',
       type: "chat"
     }
   ];

   constructor(private router: Router) {
   }

   getTelegramEntityList(){
     return this.telegramEntityList;
   }

  navigateToAddNewTelegramEntity() {
    this.router.navigate(['/add-telegram-entity'])
  }
}
