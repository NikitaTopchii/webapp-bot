import { Component } from '@angular/core';
import {TelegramService} from "../core/services/telegram/telegram.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CompetitionService} from "../core/services/competition/competition.service";
import {AdminsListService} from "../core/services/admins/admins-list.service";
import {ParticipationService} from "../core/services/participation/participation.service";
import {StorageService} from "../core/services/storage/storage.service";
import {catchError, EMPTY, forkJoin, map, Observable, of, switchMap, tap, throwError} from "rxjs";

@Component({
  selector: 'app-participation-core',
  templateUrl: './participation-core.component.html',
  styleUrl: './participation-core.component.scss'
})
export class ParticipationCoreComponent {

  successParticipation = false;
  failParticipationBySubscribe = false;
  failParticipationByTime = false;
  failAlreadyParticipation = false;
  checkingUsersInfo = false;

  private contestId: string = '';

  constructor(private telegramService: TelegramService,
              private route: ActivatedRoute,
              private participationService: ParticipationService,
              private adminsService: AdminsListService,
              private router: Router,
              private storageService: StorageService) {}

  ngOnInit() {
    this.initializeComponent();
  }

  private initializeComponent() {
    this.route.queryParams.subscribe(params => {
      this.contestId = params['tgWebAppStartParam'];
      this.checkAuthUser();
    });
  }

  checkCompetitionCondition() {
    if (!this.getContestId()) {
      return;
    }

    const formData = new FormData();

    formData.append('contest_id', this.getContestId());

    this.checkingUsersInfo = true;

    this.participationService.getCompetitionCondition(formData).subscribe((response) => {

      console.log(response);

      if (!this.checkContestExist(response.is_closed)) {
        this.processCompetitionResponse(response)
      } else {
        this.checkingUsersInfo = false;
        this.failParticipationByTime = true;
      }
    });
  }

  processCompetitionResponse(response: any) {
    const conditions = response.conditions;

    console.log('conditions in participant core: ')
    console.log(conditions);

    const channelIds = response.channels.split(',');

    forkJoin(channelIds.map((id:string) => this.checkSubscribeOnChannels(this.getParticipantId(), id))).pipe(
      switchMap((statuses: any) => {
        if (statuses.every((status:boolean) => status)) {
          return this.processParticipation(conditions);
        } else {
          this.checkingUsersInfo = false;
          this.failParticipationBySubscribe = true;
          return EMPTY;
        }
      }),
      catchError(error => {
        return EMPTY;
      })
    ).subscribe();
  }

  private processParticipation(conditions: any) {
    const formData = new FormData();
    formData.append('userid', this.getParticipantId());
    formData.append('contests_id', this.getContestId());

    return this.participationService.checkParticipation(formData).pipe(
      map(response => {
        if(response.isParticipant){
          this.checkingUsersInfo = false;
          this.failAlreadyParticipation = true;
        } else {
          this.handleSuccessfulParticipationBySubscribe(conditions);
        }
      })
    );
  }

  private handleSuccessfulParticipationBySubscribe(conditions: any) {
    const formData = this.getDataWithConditions(conditions);

    //{"email": true,
    // "phoneNumber": true,
    // "ownCondition": true,
    // "otherConditions": [
    // {"label": "\u041f\u0418\u041f\u0418\u0421\u042f \u0411\u041e\u0411\u0420\u0410", "type": "text"}
    // ],
    // "subscription": true}

    console.log(JSON.parse(conditions).type);

    if(JSON.parse(conditions).type !== 'nothing'){
      this.participationService.setCompetitionConditionSubject({ contestData: {
          user_id: this.getParticipantId(),
          contest_id: this.getContestId(),
          username: this.getUsername(),
          conditions: conditions
        } });
      this.router.navigate(['participation/condition']);
    } else {
      this.participationService.addParticipation(formData);
      this.checkingUsersInfo = false;
      this.successParticipation = true;
    }
  }

  getDataWithConditions(conditions: any){
    const formData = new FormData();

    formData.append('userid', this.getParticipantId());
    formData.append('contests_id', this.getContestId());
    formData.append('username', this.getUsername());
    formData.append('conditions', conditions);

    return formData;
  }

  checkContestExist(finishDateTime: number){
    return finishDateTime === 1;
  }

  checkSubscribeOnChannels(participantId: string, chatId: string):Observable<boolean> {
    const formData = new FormData();
    formData.append('participantId', participantId);
    formData.append('chatId', chatId);

    return this.participationService.checkSubscription(formData).pipe(
      map(response => response.isSubscribed),
      catchError(error => {
        return throwError(() => new Error('Error checking subscription'));
      })
    );
  }

  checkAuthUser(){
    const formData = this.getDataForCheckAuthUser();

    this.adminsService.getUser(formData).pipe(
      switchMap(response => {
        if (response.exists) {
          return of(response.user);
        } else {
          return this.authUser();
        }
      }),
      tap(() => this.checkCompetitionCondition())
    ).subscribe({
      error: (err) => this.handleError(err)
    });
  }

  getDataForCheckAuthUser(){
    const formData = new FormData();

    formData.append('participantId', this.getParticipantId());

    return formData;
  }

  private handleError(error: any): void {
    console.error('API Error:', error);
  }

  private getParticipantId(): string{
    return this.telegramService.InitData.id || this.storageService.getItem('participantId');
  }

  private getLanguage(): string{
    return this.telegramService.InitData.language_code || this.storageService.getItem('participantLanguage');
  }

  private getUsername(): string{
    return this.telegramService.InitData.username || this.storageService.getItem('participantUsername');
  }

  private getContestId(): string{
    return this.contestId;
  }

  private updateLocalStorage(userid: string, username: string, language: string): void {
    this.storageService.setItem('participantId', userid);
    this.storageService.setItem('username', username);
    this.storageService.setItem('language', language);
  }

  private getAuthData(userid: string, username: string, language: string): FormData {
    const formData = new FormData();
    formData.append('userid', userid);
    formData.append('username', username);
    formData.append('language', language);
    return formData;
  }

  authUser(){
    const userid = this.getParticipantId();
    const username = this.getUsername();
    const language = this.getLanguage();

    console.log(userid)

    this.updateLocalStorage(userid, username, language);

    const formData = this.getAuthData(userid, username, language)
    return this.adminsService.authUser(formData);
  }
}
