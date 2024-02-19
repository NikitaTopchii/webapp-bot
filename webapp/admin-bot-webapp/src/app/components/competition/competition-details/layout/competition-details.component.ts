import {Component} from '@angular/core';
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
export class CompetitionDetailsComponent {
  public currentContest$: Observable<any> = this.getCurrentContest$()
  public CompetitionStateEnum = CompetitionStateEnum;
  public isEditMode$: Observable<boolean> = this.route.queryParams.pipe(
    map(params => Boolean(params['edit']) || false));
  public isType$: Observable<any> = this.route.queryParams.pipe(
    map(params => params['type']))
    constructor(private competitionService: CompetitionDetailsService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  private getCurrentContest$(): Observable<any> {
      const competitionId: string = this.route.snapshot.params['competitionId'];
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
        case 'ENDED':
          return this.competitionService.getFinishedCompetitionById(competitionId).pipe(
            map(data => data.results[0])
          );
        default:
          console.log('default')
          return of(undefined);
      }
  }

  handleCustomEvent(actionType: string) {
    switch (actionType) {
      case 'SHOW_INFO':
        return;
      case 'WRITE_NEWSLETTER':
        return;
      case 'FINISH_COMPETITION':
        return;
      case 'PUBLISH':
        return;
      case 'EDIT':
        this.router.navigate([], {relativeTo: this.route, queryParams: {edit: true}, queryParamsHandling: 'merge'});
        break;
      case 'DELETE':
        return;
      case 'DOWNLOAD':
        return;
    }
  }
}

