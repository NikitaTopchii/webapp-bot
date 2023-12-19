import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ChannelsInterface} from "../../core/telegram-entity/channels.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chats-list-page',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './chats-list-page.component.html',
  styleUrl: './chats-list-page.component.scss'
})
export class ChatsListPageComponent {

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
