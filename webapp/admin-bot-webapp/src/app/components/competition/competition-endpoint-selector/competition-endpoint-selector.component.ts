import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ChannelsInterface} from "../../core/telegram-entity/channels.interface";
import {Router} from "@angular/router";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {ChannelsService} from "../../core/services/channels/channels.service";

@Component({
  selector: 'app-competition-endpoint-selector',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './competition-endpoint-selector.component.html',
  styleUrl: './competition-endpoint-selector.component.scss'
})
export class CompetitionEndpointSelectorComponent implements OnInit, OnDestroy{

  private channelsList: TelegramEntityInterface[] = [];

  selectedTelegramEntity = new Set<TelegramEntityInterface>();

  selectElementsExist: boolean = false;

  private creatorsId: any;

  constructor(private telegram: TelegramService,
              private router: Router,
              private channelsService: ChannelsService) {
    this.goBack = this.goBack.bind(this);
    this.getMyChannels();
  }

  getChannelsList(){
    return this.channelsList;
  }

  navigateToAddNewChannels() {
    this.router.navigate(['/competition-creator'])
  }

  selectTelegramEntity(entity: TelegramEntityInterface) {
    entity.selected = !entity.selected;
    this.selectedTelegramEntity.add(entity);
    this.checkSelectedElements();
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

  private getMyChannels(){
    const formData = new FormData();

    this.creatorsId = 2410;

    console.log('hello')

    formData.append('creators_id', this.creatorsId);

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
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }
}
