import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ActiveCompetitionInterface} from "../../../core/active-competition.interface";
import {TelegramService} from "../../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {SelectedChannelsService} from "../../../core/services/selected-channels/selected-channels.service";
import {CompetitionService} from "../../../core/services/competition/competition.service";

@Component({
  selector: 'app-finished-competitions-list',
  templateUrl: './finished-competitions-list.component.html',
  styleUrl: './finished-competitions-list.component.scss'
})
export class FinishedCompetitionsListComponent {

  private finishedCompetitions: ActiveCompetitionInterface[] = [];
  constructor(private telegram: TelegramService,
              private router: Router,
              private selectedChannelsService: SelectedChannelsService,
              private competitionService: CompetitionService
  ) {
    this.goBack = this.goBack.bind(this);
  }
  getFinishedCompetitions() {
    return this.finishedCompetitions;
  }

  selectCompetitionForNewsLetter(competition: any) {

  }

  getChatId(){
    this.selectedChannelsService.getSelectedChat().subscribe((chat) => {
      this.setFinishedCompetitions(chat.id);
    })
  }

  setFinishedCompetitions(chatId: string){
    console.log('SET ACTIVE COMPETITIONS')

    const formData = new FormData();

    formData.append('chatid', chatId);

    const botId = localStorage.getItem('botid');

    console.log("BOT ID: " + botId)
    if(botId){
      this.competitionService.getFinishedCompetitions(formData).subscribe((response) => {
        for(let competition of response.results){
          this.finishedCompetitions.push({
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
}
