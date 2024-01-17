import {Component, OnDestroy, OnInit} from '@angular/core';
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../../core/services/channels/channels.service";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";

@Component({
  selector: 'app-channels-with-competitions',
  templateUrl: './channels-with-competitions.component.html',
  styleUrl: './channels-with-competitions.component.scss'
})
export class ChannelsWithCompetitionsComponent implements OnInit, OnDestroy{

  private chatsList: TelegramEntityInterface[] = [];

  selectElementsExist: boolean = false;

  private chatsIdList: number[] = [];
  constructor(private telegram: TelegramService,
              private router: Router,
              private channelsService: ChannelsService,
              private selectedChannelsService: SelectedChannelsService,
              private adminsListService: AdminsListService) {
    this.goBack = this.goBack.bind(this);
  }

  getChatsList(){
    return this.chatsList;
  }

  selectTelegramEntity(entity: TelegramEntityInterface) {
    this.checkSelectedElements(entity);
  }

  checkSelectedElements(element: TelegramEntityInterface){
    this.selectElementsExist = true;
    this.selectedChannelsService.setSelectedChat(element);
    setTimeout(() => {
      this.router.navigate(['/competition-types-list'])
    }, 100);
  }

  getChatId(){
    const userid = localStorage.getItem('user_id');

    if(userid){
      const formData = new FormData();

      formData.append('user_id', userid);

      this.adminsListService.getAdminsWithSubscription(formData).subscribe((response) => {
        const admins = response.results;

        admins.forEach((admin: any) => {
          this.chatsIdList.push(admin.chatid);
        });

        this.getMyChannels();
      });
    }
  }

  private getMyChannels(){
    const formData = new FormData();

    formData.append('creators_id', this.chatsIdList.join(','));

    this.channelsService.getChannels(formData).subscribe((response) => {

      const channels = response.results;

      channels.forEach((channel: any) => {
        this.chatsList.push({
          id: channel.chatid,
          name: channel.name,
          selected: false
        })
      });
    });
  }

  goBack(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.getChatId();
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }

  createNewsLetterByChat(chat: TelegramEntityInterface) {
    this.selectedChannelsService.setSelectedChatForNewsLetter(chat);
    setTimeout(() => {
      this.router.navigate(['news-letter/public-news-letter']);
    }, 100);
  }
}
