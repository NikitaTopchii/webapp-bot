import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {main_url} from "../../../../shared/application-context";

@Injectable({
  providedIn: 'root'
})
export class CompetitionDetailsService {

  constructor(private http: HttpClient) {
  }
  getActiveCompetitions$(chatid: string) {
    return this.http
      .get<any>(main_url + '/competitions/active-competitions', { params: {chatid} });
  }

  getDelayedCompetitions$(chatid: string) {
    return this.http
      .get<any>(main_url + '/competitions/delayed-competitions', { params: {chatid} });
  }

  getFinishedCompetitions$(chatid: string) {
    return this.http
      .get<any>(main_url + '/competitions/finished-competitions', { params: {chatid} });
  }

  public getDraftCompetitions$(ownerid: string): Observable<any> {
    return this.http
      .get<any>(main_url + '/competitions/competition-drafts', { params: {ownerid} });
  }


  public getActiveCompetitionById(contestid: string): Observable<any> {
    return this.http.get('/competitions/active-competition-by-id', {params: {contestid}})
  }

  public getDelayedCompetitionById(contestid: string): Observable<any> {
    return this.http.get('/competitions/delayed-competitions-for-edit', {params: {contestid}})

  }

  public getFinishedCompetitionById(contestid: string): Observable<any> {
    return this.http.get('/competitions/finished-competition-by-id', {params: {contestid}})
  }

  public getDraftCompetitionById(contestid: string): Observable<any> {
    return this.http.get('/competitions/competition-draft-by-id', {params: {contestid}})

  }

  updateDelayedCompetition(data: FormData): Observable<any> {
    return this.http.post('/competitions/edit-delayed-competitions', data)
  }
  updateDraftCompetition(data: FormData): Observable<any> {
    return this.http.post('/competitions/update-contest-draft', data)
  }

  deleteCompetition(data: FormData): Observable<any> {
    return this.http.post('/competitions/delete-contest', data)
  }

  downloadCompetitionData(data: FormData){
    return this.http.post('/competition/download-data', data);
  }

  finishCompetition(data: FormData): Observable<any> {
    return this.http.post('/competitions/close-contest', data)
  }

  private createHttpParams(formData: FormData): HttpParams {
    let params = new HttpParams();
    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });
    return params;
  }
}
