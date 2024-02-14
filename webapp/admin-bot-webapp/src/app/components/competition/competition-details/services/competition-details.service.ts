import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {main_url} from "../../../shared/application-context";

@Injectable({
  providedIn: 'root'
})
export class CompetitionDetailsService {

  constructor(private http: HttpClient) {
  }


  updateCompetitionById(id: number, body: any) {

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


  public getActiveCompetitionById(contestid: string): Observable<any> {
    return this.http.get('/competitions/active-competition-by-id', {params: {contestid}})
  }

  public getDelayedCompetitionById(contestid: string): Observable<any> {
    return  this.http.get('/competitions/delayed-competitions-for-edit', {params: {contestid}})

  }

  public getDraftCompetitions$(): Observable<any[]> {
    // not yet implemented
    return of([]);
  }

  private createHttpParams(formData: FormData): HttpParams {
    let params = new HttpParams();
    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });
    return params;
  }

}
