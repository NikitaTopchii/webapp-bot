import { Component, OnInit } from '@angular/core';
import { CompetitionDetailsService } from "../services/competition-details.service";
import { ActivatedRoute, Router } from '@angular/router';
import {filter, map, Observable, of, switchMap, take} from "rxjs";
import { Contest } from "../shared/contest.model";
import { TelegramService } from "../../../core/services/telegram/telegram.service";

type CompetitionState = 'ACTIVE' | 'DELAYED' | 'DRAFT' | 'ENDED';

@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrl: './competition-details.component.scss'
})
export class CompetitionDetailsComponent implements OnInit {
  public currentContest$: Observable<any> = this.getCurrentContest$()
  public isEditMode$: Observable<boolean> = this.route.queryParams.pipe(
    map(params => Boolean(params['edit']) || false));
  public competitionState$: Observable<CompetitionState> = this.route.queryParams.pipe(
    map(params => params['type']));

  constructor(private competitionService: CompetitionDetailsService,
              private route: ActivatedRoute,
              private router: Router,
              private telegramService: TelegramService) {

  }

  ngOnInit() {
    this.initBackButton()
  }

  public handleCustomEvent(actionType: string): void {
    switch (actionType) {
      case 'WRITE_NEWSLETTER':
        this.router.navigate(['/news-letter/private-news-letter']);
        break;
      case 'FINISH_COMPETITION':
        const competition_Id: string = this.route.snapshot.params['competitionId'];
        const bot_id = localStorage.getItem('botid') || '';
        const user_id = localStorage.getItem('user_id') || '';

        this.currentContest$.pipe(switchMap(data => {
          let formData: FormData = new FormData();
          formData.append('contestId', competition_Id);
          formData.append('botId', bot_id);
          formData.append('userId', user_id);
          formData.append('language', data.language);
          return this.competitionService.finishCompetition(formData)

        })).subscribe(data => {
          this.router.navigate(['/competition-list'], {relativeTo: this.route, queryParamsHandling: 'merge'})
        })
        break;
      case 'PUBLISH':
        return;
      case 'EDIT':
        this.router.navigate([], {relativeTo: this.route, queryParams: {edit: true}, queryParamsHandling: 'merge'});
        break;
      case 'DELETE':
        const competitionId: string = this.route.snapshot.params['competitionId'];
        this.currentContest$.pipe(switchMap(data => {
          let formData: FormData = new FormData();
          formData.append('contestid', competitionId);
          return this.competitionService.deleteCompetition(formData)

        })).subscribe(data => {
          this.router.navigate(['/competition-list'], {relativeTo: this.route, queryParamsHandling: 'merge'})
        })
          break;
      case 'DOWNLOAD':
        return;
    }
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

  private initBackButton(): void {
    this.telegramService.BackButton.show();
    this.telegramService.BackButton.onClick(() => this.goBack());
  }

  private goBack(): void {
    this.isEditMode$.pipe(take(1)).subscribe((isEditMode) => {
      if (isEditMode) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {edit: undefined},
          queryParamsHandling: 'merge'
        });
      } else {
        this.router.navigate(['/competitions', 'competition-list'], {
          relativeTo: this.route,
          queryParamsHandling: 'merge'
        });
      }

    })
  }
}

