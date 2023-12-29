import {Component, OnInit} from '@angular/core';
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {ActivatedRoute} from "@angular/router";
import {CompetitionService} from "../../core/services/competition/competition.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-competition-participation',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './competition-participation.component.html',
  styleUrl: './competition-participation.component.scss'
})
export class CompetitionParticipationComponent implements OnInit{
  successParticipation = false;
  failParticipationBySubscribe = false;
  failParticipationByTime = false;

  private competitionId: string | null = '';

  private channelIds: string[] = [];
  private channelsSubscribeStatus: boolean[] = [];

  private userId: any;
  constructor(private telegramService: TelegramService,
              private route: ActivatedRoute,
              private competitionService: CompetitionService) {
  }

  checkCompetitionCondition(){
    const formData = new FormData();

    if(this.competitionId){
      formData.append('contest_id', this.competitionId);

      this.competitionService.getCompetition(formData).subscribe((response) => {
        const finishTime = new Date(response.results[0].finish_time);
        const currentTime = new Date();

        if(this.checkCurrentDate(currentTime, finishTime)){
          const channelIds = response.results[0].channels.split(',');

          channelIds.forEach((id: string) => {
            this.checkSubscribeOnChannels(this.userId, id);
          })

          if(this.channelsSubscribeStatus.every(status => status === true)){
            this.successParticipation = true;
          } else {
            this.failParticipationBySubscribe = true;
          }
        } else {
          this.failParticipationByTime = true;
        }
      })
    }
  }

  checkCurrentDate(currentTime: Date, finishTime: Date){
    return currentTime < finishTime;
  }

  checkSubscribeOnChannels(userId: string, channelId: string){
    const formData = new FormData();

    formData.append('user_id', userId);
    formData.append('channel_id', channelId);

    this.competitionService.checkSubscription(formData).subscribe((response) => {
        if(response){
          this.channelsSubscribeStatus.push(true);
        }else{
          this.channelsSubscribeStatus.push(false);
        }
    })
  }

  ngOnInit() {
    this.userId = this.telegramService.UserData.id;
    this.competitionId = this.route.snapshot.paramMap.get('competitionId');

    this.checkCompetitionCondition();
  }
}
