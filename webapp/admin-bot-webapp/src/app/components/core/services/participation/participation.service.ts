import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {main_url} from "../../../shared/application-context";
import {BehaviorSubject} from "rxjs";
import {CompetitionConditionsInterface} from "../../competition-conditions.interface";

@Injectable({
  providedIn: 'root'
})
export class ParticipationService {

  private competitionCondition = new BehaviorSubject<CompetitionConditionsInterface>({
    contestData: new FormData()
  })
  constructor(private http: HttpClient) { }

  setCompetitionConditionSubject(competitionCondition: CompetitionConditionsInterface){
    this.competitionCondition.next(competitionCondition);
  }
  getCompetitionConditionSubject(){
    return this.competitionCondition.asObservable();
  }
  getCompetitionCondition(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/competitions/condition', {params: params});
  }

  checkSubscription(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http.get<any>(main_url+'/competitions/subscribe-verification', { params: params });
  }

  addParticipationWithAnswer(formData: FormData){
    return this.http
      .post<string>(main_url + '/participant/answer', formData);
  }

  addParticipation(formData: FormData){
    return this.http
      .post<string>(main_url + '/participant/add', formData)
      .subscribe((response) => {});
  }

  checkParticipation(formData: FormData) {
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/participant/check', {params: params});
  }
}
