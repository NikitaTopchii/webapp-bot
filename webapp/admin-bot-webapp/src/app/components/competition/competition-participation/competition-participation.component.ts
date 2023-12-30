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

  private competitionId: any;

  private channelIds: string[] = [];
  private channelsSubscribeStatus: boolean[] = [];

  private userId: any;
  constructor(private telegramService: TelegramService,
              private route: ActivatedRoute,
              private competitionService: CompetitionService) {
    this.route.queryParams.subscribe(params => {
      this.competitionId = params['tgWebAppStartParam'];
      console.log("competitionId" + this.competitionId)
    });
  }

  checkCompetitionCondition() {
    const formData = new FormData();

    if (this.competitionId) {
      formData.append('contest_id', this.competitionId);

      this.competitionService.getCompetition(formData).subscribe((response) => {
        const finishTime = new Date(response.results[0].finish_time);
        const currentTime = new Date();

        if (this.checkCurrentDate(currentTime, finishTime)) {
          const channelIds = response.results[0].channels.split(',');

          Promise.all(channelIds.map((id: string) => this.checkSubscribeOnChannels(this.userId, id)))
            .then((statuses) => {
              if (statuses.every(status => status)) {
                console.log('this is work');
                console.log(statuses);
                this.successParticipation = true;
              } else {
                this.failParticipationBySubscribe = true;
              }
            })
            .catch((error) => {
              console.error(error);
              // handle error
            });
        } else {
          this.failParticipationByTime = true;
        }
      });
    }
  }

  checkCurrentDate(currentTime: Date, finishTime: Date){
    console.log(currentTime, finishTime)
    console.log(currentTime < finishTime)
    return currentTime < finishTime;
  }

  checkSubscribeOnChannels(userId: string, channelId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('channel_id', channelId);

      this.competitionService.checkSubscription(formData).subscribe(
        (response) => {
          if (response) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  ngOnInit() {
    this.successParticipation = false;
    this.failParticipationBySubscribe = false;
    this.failParticipationByTime = false;
    this.userId = this.telegramService.InitData.id;

    this.checkCompetitionCondition();
  }
}
