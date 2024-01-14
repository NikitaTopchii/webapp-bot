import {Component, OnDestroy, OnInit} from '@angular/core';
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../../core/services/channels/channels.service";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-competition-types-list',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './competition-types-list.component.html',
  styleUrl: './competition-types-list.component.scss'
})
export class CompetitionTypesListComponent implements OnInit, OnDestroy{

  constructor(private telegram: TelegramService,
              private router: Router) {
    this.goBack = this.goBack.bind(this);
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

  navigateToActiveCompetitions() {
    this.router.navigate(['active-competitions-list']);
  }
}
