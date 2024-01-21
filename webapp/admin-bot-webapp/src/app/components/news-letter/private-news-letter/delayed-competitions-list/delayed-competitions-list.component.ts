import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ActiveCompetitionInterface} from "../../../core/active-competition.interface";
import {TelegramService} from "../../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../../../core/services/channels/channels.service";
import {SelectedChannelsService} from "../../../core/services/selected-channels/selected-channels.service";
import {CompetitionService} from "../../../core/services/competition/competition.service";

@Component({
  selector: 'app-delayed-competitions-list',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './delayed-competitions-list.component.html',
  styleUrl: './delayed-competitions-list.component.scss'
})
export class DelayedCompetitionsListComponent implements OnInit, OnDestroy{

  private delayedCompetitions: ActiveCompetitionInterface[] = [];
  constructor(private telegram: TelegramService,
              private router: Router,
              private selectedChannelsService: SelectedChannelsService,
              private competitionService: CompetitionService
  ) {
    this.goBack = this.goBack.bind(this);
  }
  selectCompetitionForNewsLetter(competition: any) {

  }

  getDelayedCompetitions() {
    return this.delayedCompetitions;
  }

  getChatId(){
    this.selectedChannelsService.getSelectedChat().subscribe((chat) => {
      this.setDelayedCompetitions(chat.id);
    })
  }

  setDelayedCompetitions(chatId: string){
    console.log('SET ACTIVE COMPETITIONS')

    const formData = new FormData();

    formData.append('chatid', chatId);

    const botId = localStorage.getItem('botid');

    console.log("BOT ID: " + botId)
    if(botId){
      this.competitionService.getDelayedCompetitions(formData).subscribe((response) => {
        for(let competition of response.results){
          this.delayedCompetitions.push({
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
