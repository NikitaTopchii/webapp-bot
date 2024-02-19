import {Component} from '@angular/core';
import {CompetitionDetailsService} from "../../services/competition-details.service";
import {map, Observable, of, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminsListService} from "../../../../core/services/admins/admins-list.service";

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrl: './competition-list.component.scss'
})
export class CompetitionListComponent {
  public user_id = localStorage.getItem('user_id');
  public type = this.route.snapshot.queryParams['type'];
  public competitionList$: Observable<any[]> = this.getCompetitionList$();

  constructor(private competitionDetailsService: CompetitionDetailsService,
              private route: ActivatedRoute,
              private adminsListService: AdminsListService,
              private router: Router) {
  }

  public redirectToCompetitionDetails(competitionId: string) {
    this.router.navigate(['competitions', competitionId], {
      queryParams: {
        type: this.type
      }
    });
  }

  private getCompetitionList$() {
    if (!this.user_id) {
      return of([]);
    }

    const formData = new FormData();
    formData.append('user_id', this.user_id);

    const getChatIds$ = this.adminsListService.getAdminsWithSubscription(formData).pipe(
      map(result => result['results'].map((chat: any) => chat['chatid']).join(','))
    );

    switch (this.route.snapshot.queryParams['type']) {
      case 'ACTIVE':
        return getChatIds$.pipe(
          switchMap(data => this.competitionDetailsService.getActiveCompetitions$(data)),
          map(data => data.results)
        );
      case 'DELAYED':
        return getChatIds$.pipe(
          switchMap(data => this.competitionDetailsService.getDelayedCompetitions$(data)),
          map(data => data.results)
        );
      case 'ENDED':
        return getChatIds$.pipe(
          switchMap(data => this.competitionDetailsService.getFinishedCompetitions$(data)),
          map(data => data.results)
        );
      case 'DRAFT':
        return this.competitionDetailsService.getDraftCompetitions$(this.user_id).pipe(
          map(data => data.results)
        )
      default:
        return of([]);
    }
  }
}
