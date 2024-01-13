import {Component, OnDestroy, OnInit} from '@angular/core';
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../../core/services/channels/channels.service";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-channels-with-competitions',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './channels-with-competitions.component.html',
  styleUrl: './channels-with-competitions.component.scss'
})
export class ChannelsWithCompetitionsComponent implements OnInit, OnDestroy{

  private channelsList: TelegramEntityInterface[] = [];

  selectedTelegramEntity = new Set<TelegramEntityInterface>();

  selectElementsExist: boolean = false;

  private creatorsIdLists: number[] = [];

  private creatorsId: any;

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

  navigateToCompetitions() {
    this.selectedChannelsService.setSelectedChannels(this.selectedTelegramEntity);

    this.router.navigate(['/competitions-type'])
  }

  selectTelegramEntity(entity: TelegramEntityInterface) {
    if(entity.selected){
      entity.selected = !entity.selected;
      this.selectedTelegramEntity.delete(entity);
      this.checkSelectedElements();
    }else{
      entity.selected = !entity.selected;
      this.selectedTelegramEntity.add(entity);
      this.checkSelectedElements();
    }
  }

  checkSelectedElements(){
    for (const element of this.selectedTelegramEntity) {
      if (element.selected) {
        this.selectElementsExist = true;
        break;
      } else {
        this.selectElementsExist = false;
      }
    }
  }

  getCreatorsId(){
    const userid = localStorage.getItem('user_id');

    if(userid){
      const formData = new FormData();

      formData.append('user_id', userid);

      this.adminsListService.getAdminsWithSubscription(formData).subscribe((response) => {
        const admins = response.results;

        admins.forEach((admin: any) => {
          this.creatorsIdLists.push(admin.chatid);
        });

        this.getMyChannels();
      });
    }
  }

  private getMyChannels(){
    const formData = new FormData();

    formData.append('creators_id', this.creatorsIdLists.join(','));

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

  goBack(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.getCreatorsId();
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }
}
