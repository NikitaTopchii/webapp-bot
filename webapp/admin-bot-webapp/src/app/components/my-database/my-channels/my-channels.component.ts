import {Component, OnDestroy, OnInit} from '@angular/core';
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../../core/services/channels/channels.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {MainStatsComponent} from "../main-stats-component";
import {map} from "rxjs";

@Component({
  selector: 'app-my-channels',
  templateUrl: './my-channels.component.html',
  styleUrl: './my-channels.component.scss'
})
export class MyChannelsComponent extends MainStatsComponent implements OnInit, OnDestroy{

  private channelsList: TelegramEntityInterface[] = [];
  private chatIdsList: number[] = [];
  constructor(public override telegramService: TelegramService,
              private router: Router,
              private channelsService: ChannelsService,
              private adminsListService: AdminsListService) {
    super(telegramService)
    this.goBack = this.goBack.bind(this);
  }

  getChannelsList(){
    return this.channelsList;
  }

  goBack(){
    this.router.navigate(['/my-database/main']);
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
    this.channelsService.getChannelsByChatIds(chatIds)
      .subscribe((response: any) => {
        this.channelsList = response;
    });
  }
}
