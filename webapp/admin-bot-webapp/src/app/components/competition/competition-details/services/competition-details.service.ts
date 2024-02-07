import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Contest} from "../shared/contest.model";
import {CONTEST_LIST} from "../contest";

@Injectable({
  providedIn: 'root'
})
export class CompetitionDetailsService {
  private competitionListSource: BehaviorSubject<Contest[]> = new BehaviorSubject<Contest[]>(CONTEST_LIST);
  public competitionList$ = this.competitionListSource.asObservable();

  getContestById(id: string): Observable<Contest> {
    return this.competitionList$.pipe(
      map((contests: Contest[]) => {
         return contests.filter((contest: Contest) => contest.id === id)[0];
    }));
  }

}
