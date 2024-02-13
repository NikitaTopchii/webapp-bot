import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {Contest} from "../shared/contest.model";
import {CONTEST_LIST} from "../contest";
import {HttpClient, HttpParams} from "@angular/common/http";
import {main_url} from "../../../shared/application-context";

@Injectable({
  providedIn: 'root'
})
export class CompetitionDetailsService {
  private competitionListSource: BehaviorSubject<Contest[]> = new BehaviorSubject<Contest[]>(CONTEST_LIST);
  public competitionList$ = this.competitionListSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getContestById(id: string): Observable<Contest> {
    return this.competitionList$.pipe(
      map((contests: Contest[]) => {
         return contests.filter((contest: Contest) => contest.id === id)[0];
    }));
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
