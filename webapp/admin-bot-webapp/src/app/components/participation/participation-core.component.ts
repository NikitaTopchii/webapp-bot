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
      console.error('Contest ID is missing');
      return;
    }

    const formData = new FormData();

    formData.append('contest_id', this.getContestId());

    this.checkingUsersInfo = true;

    this.participationService.getCompetitionCondition(formData).subscribe((response) => {

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
    const answer = response.answer;
    const channelIds = response.channels.split(',');

    forkJoin(channelIds.map((id:string) => this.checkSubscribeOnChannels(this.getParticipantId(), id))).pipe(
      switchMap((statuses: any) => {
        console.log(statuses)
        if (statuses.every((status:boolean) => status)) {
          return this.processParticipation(conditions, answer);
        } else {
          this.checkingUsersInfo = false;
          this.failParticipationBySubscribe = true;
          return EMPTY;
        }
      }),
      catchError(error => {
        console.error('Error in method:', error);
        return EMPTY;
      })
    ).subscribe();
  }

  private processParticipation(conditions: string, answer: string) {
    const formData = new FormData();
    formData.append('userid', this.getParticipantId());
    formData.append('contests_id', this.getContestId());

    return this.participationService.checkParticipation(formData).pipe(
      map(response => {
        if(response.isParticipant){
          this.checkingUsersInfo = false;
          this.failAlreadyParticipation = true;
        } else {
          this.handleSuccessfulParticipationBySubscribe(conditions, answer);
        }
      })
    );
  }

  private handleSuccessfulParticipationBySubscribe(conditions: string, answer: string) {
    const formData = this.getDataWithConditions(conditions, answer);

    if(conditions !== 'subscribe'){
      this.participationService.setCompetitionConditionSubject({ contestData: formData });
      this.router.navigate(['participation/condition']);
    } else {
      this.participationService.addParticipation(formData);
      this.checkingUsersInfo = false;
      this.successParticipation = true;
    }
  }

  getDataWithConditions(conditions: string, answer: string){
    const formData = new FormData();

    formData.append('userid', this.getParticipantId());
    formData.append('contests_id', this.getContestId());
    formData.append('username', this.getUsername());
    formData.append('conditions', conditions);
    formData.append('answer', answer);

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
        console.error('Error in checkSubscribeOnChannels:', error);
        // Updated usage of throwError
        return throwError(() => new Error('Error checking subscription'));
      })
    );
  }

  checkAuthUser(){
    const formData = this.getDataForCheckAuthUser();

    this.adminsService.getUser(formData).pipe(
      switchMap(response => {
        console.log('response from auth user')
        console.log(response)
        if (response.exists) {
          console.log('user exists')
          return of(response.user);
        } else {
          console.log('auth user')
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

    this.updateLocalStorage(userid, username, language);

    const formData = this.getAuthData(userid, username, language)
    return this.adminsService.authUser(formData);
  }
}
