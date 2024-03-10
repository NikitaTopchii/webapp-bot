import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {TelegramEntityInterface} from "../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../core/services/channels/channels.service";
import {AdminsListService} from "../core/services/admins/admins-list.service";

@Component({
  selector: 'app-chats-selector',
  templateUrl: './chats-selector.component.html',
  styleUrl: './chats-selector.component.scss'
})
export class ChatsSelectorComponent {

  private chatList: TelegramEntityInterface[] = [];
  constructor(private telegramService: TelegramService,
              private router: Router,
              private channelsService: ChannelsService,
              private adminsListService: AdminsListService) {
    this.goBack = this.goBack.bind(this);
  }

  getChatList(){
    return this.chatList;
  }

  goBack(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.telegramService.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.getChatIds();
    this.telegramService.BackButton.show();
    this.telegramService.BackButton.onClick(this.goBack);
  }
  private getChatIds(){
    this.adminsListService.getAdminsChatIds()
      .subscribe((chatIds: any) => {
        this.getMyChannels(chatIds);
      });
  }

  private getMyChannels(chatIds: string[]){
    this.channelsService.getChatGuardChannelsByChatIds(chatIds)
      .subscribe((response: any) => {
        this.chatList = response;
      });
  }

  navigateToCurrentChatSettings(id: string) {
    console.log(id)
    this.router.navigate(['/chatguard/chat-guard-setting', id])
  }
}
