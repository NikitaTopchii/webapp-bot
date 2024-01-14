import {Component, OnDestroy, OnInit} from '@angular/core';
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../../core/services/channels/channels.service";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";
import {CompetitionService} from "../../core/services/competition/competition.service";
import {ActiveCompetitionInterface} from "../../core/active-competition.interface";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-active-competitions-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './active-competitions-list.component.html',
  styleUrl: './active-competitions-list.component.scss'
})
export class ActiveCompetitionsListComponent implements OnInit, OnDestroy{

  private activeCompetitions: ActiveCompetitionInterface[] = [];
  constructor(private telegram: TelegramService,
              private router: Router,
              private channelsService: ChannelsService,
              private selectedChannelsService: SelectedChannelsService,
              private competitionService: CompetitionService
  ) {
    this.goBack = this.goBack.bind(this);
  }
  goBack(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  getActiveCompetitions(){
    return this.activeCompetitions;
  }

  getChatId(){
    this.selectedChannelsService.getSelectedChat().subscribe((chat) => {
      this.setActiveCompetitions(chat.id);
    })
  }

  setActiveCompetitions(chatId: string){
    console.log('SET ACTIVE COMPETITIONS')

    const formData = new FormData();

    formData.append('chatid', chatId);

    const botId = localStorage.getItem('botid');

    console.log("BOT ID: " + botId)
    if(botId){
      this.competitionService.getActiveCompetitions(formData).subscribe((response) => {
        for(let competition of response.results){
          this.activeCompetitions.push({
            contestId: competition.contest_id,
            name: competition.name,
            finishTime: competition.finish_time,
            chatId: chatId,
            botId: botId
          })
        }
      })
    }
  }

  ngOnInit(): void {
    this.getChatId();
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }

  selectCompetitionForNewsLetter(competition: ActiveCompetitionInterface) {
    this.competitionService.setActiveCompetition(competition);
    setTimeout(() => {
      this.router.navigate(['private-news-letter']);
    }, 100);
  }
}
