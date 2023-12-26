import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {ChannelsInterface} from "../../core/telegram-entity/channels.interface";
import {Router} from "@angular/router";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";

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

  private channelsList: TelegramEntityInterface[] = [
    {
      id: '1',
      name: 'Dota2',
      type: "channel",
      selected: false
    },
    {
      id: '2',
      name: 'Rockstar',
      type: "channel",
      selected: false,
    },
    {
      id: '3',
      name: 'Rockstar',
      type: "chat",
      selected: false
    },
    {
      id: '4',
      name: 'Dota2',
      type: "channel",
      selected: false
    },
    {
      id: '5',
      name: 'Rockstar',
      type: "channel",
      selected: false
    },
    {
      id: '6',
      name: 'Rockstar',
      type: "chat",
      selected: false
    },
    {
      id: '7',
      name: 'Dota2',
      type: "channel",
      selected: false
    },
    {
      id: '7',
      name: 'Rockstar',
      type: "channel",
      selected: false
    },
    {
      id: '8',
      name: 'Rockstar',
      type: "chat",
      selected: false
    }
  ];

  selectedTelegramEntity = new Set<TelegramEntityInterface>();

  selectElementsExist: boolean = false;

  constructor(private telegram: TelegramService,
              private router: Router) {
    this.goBack = this.goBack.bind(this);
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
    this.selectedTelegramEntity.forEach(element => {
      this.selectElementsExist = element.selected;
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