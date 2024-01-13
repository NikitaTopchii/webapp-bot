import {Component, OnInit} from '@angular/core';
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {ActivatedRoute} from "@angular/router";
import {CompetitionService} from "../../core/services/competition/competition.service";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {AdminsListService} from "../../core/services/admins/admins-list.service";

@Component({
  selector: 'app-competition-participation',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './competition-participation.component.html',
  styleUrl: './competition-participation.component.scss'
})
export class CompetitionParticipationComponent implements OnInit{
  successParticipation = false;
  failParticipationBySubscribe = false;
  failParticipationByTime = false;
  failAlreadyParticipation = false;
  checkingUsersInfo = false;

  private competitionId: any;

  private channelIds: string[] = [];
  private channelsSubscribeStatus: boolean[] = [];

  private userId: any;
  constructor(private telegramService: TelegramService,
              private route: ActivatedRoute,
              private competitionService: CompetitionService,
              private adminsService: AdminsListService) {
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

        console.log(response.results[0].finish_time)

        const finishTime = new Date(response.results[0].finish_time);
        const currentTime = new Date();

        if (this.checkCurrentDate(currentTime, finishTime)) {
          const channelIds = response.results[0].channels.split(',');

          Promise.all(channelIds.map((id: string) => this.checkSubscribeOnChannels(this.userId, id)))
            .then((statuses) => {
              if (statuses.every(status => status)) {
                console.log('this is work');
                console.log(statuses);

                const formData = new FormData();

                formData.append('userid', this.userId);
                formData.append('contests_id', this.competitionId);

                this.competitionService.checkParticipation(formData).subscribe((response) => {
                  if(response.results[0]){
                    this.checkingUsersInfo = false;
                    this.failAlreadyParticipation = true;
                  } else {

                    const username = this.telegramService.InitData.username;
                    const formData = new FormData();

                    if(username){
                      formData.append('userid', this.userId);
                      formData.append('contests_id', this.competitionId);
                      formData.append('username', username);

                      this.competitionService.addParticipation(formData);

                      this.checkingUsersInfo = false;
                      this.successParticipation = true;
                    }
                  }
                });

              } else {
                this.checkingUsersInfo = false;
                this.failParticipationBySubscribe = true;
              }
            })
            .catch((error) => {
              console.error(error);
              // handle error
            });
        } else {
          this.checkingUsersInfo = false;
          this.failParticipationByTime = true;
        }
      });
    }
  }

  checkCurrentDate(currentDateTime: Date, finishDateTime: Date){
    // Парсимо рядок фінішного часу
    const finishTime = finishDateTime;

    // Отримуємо часовий пояс з поточного часу
    const currentTimeZoneOffset = currentDateTime.getTimezoneOffset();

    // Переводимо поточний час в той же часовий пояс, що і фінішний час
    const currentTime = new Date(finishTime.getTime() + (currentTimeZoneOffset * 60 * 1000));

    console.log("Поточний час:", currentTime);
    console.log("Фінішний час:", finishTime);

    // Порівнюємо часи, ураховуючи часовий пояс
    console.log(currentTime.getTime() < finishTime.getTime());

    return currentTime.getTime() < finishTime.getTime();
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

  checkAuthUser(){
    const formData = new FormData();


    console.log("USER ID: " + this.userId);
    formData.append('userid', this.userId);

    this.adminsService.getUser(formData).subscribe((response) => {
      console.log(response.results.length)
      console.log(response.results)
      console.log(response)
      if(response.results.length === 0){
        console.log("HUI")
        this.authUser().subscribe((response) => {
          this.checkCompetitionCondition();
        })
      }else{
        console.log('RESPONSE')
        console.log(response)
        this.checkCompetitionCondition();
      }
    });
  }

  authUser(){
    const formData = new FormData();

    let userid;
    let username;
    let language

    // this.userId = '464155131';
    //
    if(this.userId){
      localStorage.setItem('participantId', this.userId);
      localStorage.setItem('username', this.telegramService.InitData.username);
      localStorage.setItem('language', this.telegramService.InitData.language_code)
      userid = localStorage.getItem('participantId');
      username = localStorage.getItem('username');
      language = localStorage.getItem('language');
    }else{
      userid = localStorage.getItem('participantId');
      username = localStorage.getItem('username');
      language = localStorage.getItem('language');
    }


    if(userid && username && language){
      const isAdmin = '0';
      const subscription = '';

      formData.append('userid', userid);
      formData.append('username', username);
      formData.append('language', language);
      formData.append('isAdmin', isAdmin);
      formData.append('subscription', subscription);
    }

    return this.adminsService.authUser(formData);
  }

  ngOnInit() {
    this.successParticipation = false;
    this.failParticipationBySubscribe = false;
    this.failParticipationByTime = false;
    this.userId = this.telegramService.InitData.id;

    this.checkingUsersInfo = true;
    this.checkAuthUser();
  }
}
