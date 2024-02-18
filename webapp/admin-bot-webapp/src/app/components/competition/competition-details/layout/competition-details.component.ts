import {Component, OnInit} from '@angular/core';
import {CompetitionDetailsService} from "../services/competition-details.service";
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, Observable, of} from "rxjs";
import {Contest} from "../shared/contest.model";

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
  public currentContest$: Observable<any> = this.getCurrentContest$()
  public CompetitionStateEnum = CompetitionStateEnum;
  public isEditMode$: Observable<boolean> = this.route.queryParams.pipe(
    map(params => Boolean(params['edit']) || false));


  public competitionStatus$: Observable<CompetitionStateEnum> = this.currentContest$.pipe(
    filter(contest => !!contest),
    map(contest => this.getContestStatus(contest) )
  );


    constructor(private competitionService: CompetitionDetailsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
      this.currentContest$.subscribe(d => {
        console.log('current contest', d)
      });

      this.getCurrentContest$().subscribe(d => {
        console.log('get current contest', d);
      })

    console.log(this.route.snapshot.queryParams)
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


  private getCurrentContest$(): Observable<any> {
      const competitionId: string = this.route.snapshot.params['competitionId'];
    console.log(this.route.snapshot.queryParams['type'])
      switch (this.route.snapshot.queryParams['type']) {
        case 'ACTIVE':
          console.log('active')
          return this.competitionService.getActiveCompetitionById(competitionId).pipe(
            map(data => data.results[0])
          );
        case 'DELAYED':
          return this.competitionService.getDelayedCompetitionById(competitionId).pipe(
            map(data => data.results[0])
          );
        case 'DRAFT':
          return this.competitionService.getDraftCompetitionById(competitionId).pipe(
            map(data => data.results[0])
          );
        default:
          console.log('default')
          return of(undefined);
      }
  }
}

