import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {main_url} from "../../../shared/application-context";
import {TokenGenerateService} from "../token/token-generate.service";
import {BehaviorSubject, Subject} from "rxjs";
import {ActiveCompetitionInterface} from "../../active-competition.interface";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  private activeCompetition = new BehaviorSubject<ActiveCompetitionInterface>({
    contestId: '',
    name: '',
    finishTime: '',
    chatId: '',
    botId: ''
  });
  constructor(private http: HttpClient, private router: Router) {
  }

  setActiveCompetition(competition: ActiveCompetitionInterface){
    this.activeCompetition.next(competition);
  }

  getActiveCompetition(){
    return this.activeCompetition.asObservable();
  }

  createCompetition(formData: FormData) {
    return this.http
      .post<string>(main_url + '/competitions/create', formData);
  }

  addParticipation(formData: FormData){
    return this.http
      .post<string>(main_url + '/participant/add', formData)
      .subscribe((response) => {

        console.log(response)
      });
  }

  checkParticipation(formData: FormData) {
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/participant/check', {params: params});
  }

  getCompetition(formData: FormData) {
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http.get<any>(main_url+'/competitions/competition', { params: params });
  }

  checkSubscription(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http.get<any>(main_url+'/competitions/subscribe-verification', { params: params });
  }

  getActiveCompetitions(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http.get<any>(main_url+'/competitions/active-competitions', { params: params });
  }
  publishCompetition(formData: FormData) {
    return this.http
      .post<string>(main_url + '/competitions/publish', formData)
      .subscribe((response) => {

        console.log(response)
      });
  }
}
