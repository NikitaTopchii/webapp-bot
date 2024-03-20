import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {ChannelsService} from "../../core/services/channels/channels.service";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";

@Component({
  selector: 'app-competition-endpoint-selector',
  templateUrl: './competition-endpoint-selector.component.html',
  styleUrl: './competition-endpoint-selector.component.scss'
})
export class CompetitionEndpointSelectorComponent implements OnInit, OnDestroy{

  private channelsList: TelegramEntityInterface[] = [];

  selectedTelegramEntity = new Set<TelegramEntityInterface>();

  selectElementsExist: boolean = false;

  private chatIdsList: number[] = [];

  constructor(private telegram: TelegramService,
              private router: Router,
              private channelsService: ChannelsService,
              private selectedChannelsService: SelectedChannelsService,
              private adminsListService: AdminsListService) {
    this.goBack = this.goBack.bind(this);
  }

  getChannelsList(){
    return this.channelsList;
  }

  navigateToAddNewChannels() {
    this.selectedChannelsService.setSelectedChannels(this.selectedTelegramEntity);

    this.router.navigate(['/competition-creator'])
  }

  selectTelegramEntity(entity: TelegramEntityInterface) {
    if(entity.selected){
      entity.selected = !entity.selected;
      this.selectedTelegramEntity.delete(entity);
    }else{
      entity.selected = !entity.selected;
      this.selectedTelegramEntity.add(entity);
    }
  }

  checkSelectedElements(){
    console.log('check selected elements: ' + this.selectedTelegramEntity.size)
    console.log('check selected elements: ' + (this.selectedTelegramEntity.size === 0))
    return this.selectedTelegramEntity.size === 0;
  }

  getChatIds(){
    const userid = localStorage.getItem('user_id');

    if(userid){
      const formData = new FormData();

      formData.append('user_id', userid);

      this.adminsListService.getAdminsWithSubscription(formData).subscribe((response) => {
        const admins = response.results;

        admins.forEach((admin: any) => {
          this.chatIdsList.push(admin.chatid);
        });

        this.getMyChannels();
      });
    }
  }

  private getMyChannels(){
    const formData = new FormData();

    const botid = localStorage.getItem('botid');

    if(botid){
      formData.append('chat_ids', this.chatIdsList.join(','));
      formData.append('botid', botid);

      this.channelsService.getChannels(formData).subscribe((response) => {

        const channels = response.results;

        channels.forEach((channel: any) => {
          this.channelsList.push({
            id: channel.chatid,
            name: channel.name,
            selected: false
          })
        });
      });
    }
  }

  goBack(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.getChatIds();
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }
}
