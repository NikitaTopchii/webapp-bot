import {Component, OnInit} from '@angular/core';
import {CompetitionDetailsService} from "../services/competition-details.service";
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, Observable} from "rxjs";
import {switchMap} from "rxjs/operators"
import {Contest} from "../shared/contest.model";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

enum CompetitionStateEnum {
  DELAYED = -1,
  ACTIVE,
  ENDED,
  DRAFT,
  NONE
}

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrl: './competition-details.component.scss'
})
export class CompetitionDetailsComponent implements OnInit {
  // public currentContest$: Observable<any> = this.getCurrentContest$()
  public CompetitionStateEnum = CompetitionStateEnum;
  public competitionState: CompetitionStateEnum = CompetitionStateEnum.NONE;
  public isEditMode$: Observable<boolean> = this.route.queryParams.pipe(
    map(params => Boolean(params['edit']) || false));

  public contest$: Observable<Contest> = this.route.params.pipe(
    switchMap(params => this.competitionService.getContestById(params['competitionId']))
  );
  public competitionStatus$: Observable<CompetitionStateEnum> = this.contest$.pipe(
    filter(contest => !!contest),
    map(contest => this.getContestStatus(contest) )
  );


    constructor(private competitionService: CompetitionDetailsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }


  edit() {
    this.router.navigate([], {relativeTo: this.route, queryParams: {edit: true}});
  }

  cancel() {
    this.router.navigate([], {relativeTo: this.route, queryParams: {}});
  }

  private getContestStatus(contest: Contest): CompetitionStateEnum {
    switch (contest?.is_closed) {
      case "-1":
        return CompetitionStateEnum.DELAYED;
      case "0":
        return CompetitionStateEnum.ACTIVE;
      case "1":
        return CompetitionStateEnum.ENDED;
      case "2":
        return CompetitionStateEnum.DRAFT;
      default:
        return CompetitionStateEnum.NONE
    }

  }


  // private getCurrentContest$(): Observable<any> {
  //     const competitionId: string = this.route.snapshot.params['competitionId']
  //     switch (this.route.snapshot.queryParams['type']) {
  //       case: 'ACTIVE'
  //         return this.competitionService.getActiveCompetitionById(competitionId).pipe()
  //     }
  // }
}

