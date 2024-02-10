import {Component, OnInit} from '@angular/core';
import {CompetitionDetailsService} from "../../services/competition-details.service";
import {map, Observable, of, switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminsListService} from "../../../../core/services/admins/admins-list.service";

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrl: './competition-list.component.scss'
})
export class CompetitionListComponent implements OnInit {
  constructor(private competitionDetailsService: CompetitionDetailsService,
              private route: ActivatedRoute,
              private router: Router,
              private adminsListService: AdminsListService) {
  }

  public competitionList$: Observable<any[]> = this.getCompetitionList$();

  ngOnInit() {
    const userid = localStorage.getItem('user_id');
    const formData = new FormData();
    formData.append('user_id', '591498550');
    this.adminsListService.getAdminsWithSubscription(formData).pipe(
      map(result => {
        return result['results'].map((chat: any) => chat['chatid']).join(',')
      }),
      switchMap(data => this.competitionDetailsService.getActiveCompetitions$(data))
    ).subscribe(response => {
      console.log(response)
    })
  }


  private getCompetitionList$() {
    switch (this.route.snapshot.queryParams['type']) {
      case 'ACTIVE':
        return this.competitionDetailsService.getActiveCompetitions$('')
      case 'DELAYED':
        return this.competitionDetailsService.getDelayedCompetitions$()
      case 'ENDED':
        return this.competitionDetailsService.getFinishedCompetitions$()
      default:
        return of([])
    }
  }
}
