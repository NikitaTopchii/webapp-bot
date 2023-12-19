import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {Router} from "@angular/router";
import {ChannelsInterface} from "../../core/telegram-entity/channels.interface";

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

   private channelsList: ChannelsInterface[] = [
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

   getChannelsList(){
     return this.channelsList;
   }

  navigateToAddNewChannels() {
    this.router.navigate(['/add-channels'])
  }
}
