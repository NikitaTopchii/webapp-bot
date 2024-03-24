import {Component, OnInit} from '@angular/core';
import {UserCompetitionsService} from "../../core/services/user-competitions/user-competitions.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-active-user-competition',
  standalone: true,
  imports: [],
  templateUrl: './active-user-competition.component.html',
  styleUrl: './active-user-competition.component.scss'
})
export class ActiveUserCompetitionComponent implements OnInit{
  private competitionList: any[] = [];
  private userId: string = '';

  constructor(private userCompetitionService: UserCompetitionsService, private router: Router) {
    this.userId = localStorage.getItem('user_id') || '';
  }

  redirectToCompetitionDetails(contestId: any) {
    this.router.navigate(['/user-competitions/competition-details', contestId])
  }

  getCompetitionList(){
    return this.competitionList;
  }

  getUserCompetitionsIds(){
    this.userCompetitionService.getUserCompetitionsId(this.userId).subscribe((contestIdsArr) => {
      this.getActiveCompetitionsDetails(contestIdsArr);
    })
  }

  getActiveCompetitionsDetails(contestIdsArr: string[]){
    this.userCompetitionService.getActiveCompetitionsPreInfo(contestIdsArr.join(',')).subscribe((competitions) => {
      this.competitionList = competitions;
    })
  }

  ngOnInit(): void {
    this.getUserCompetitionsIds();
  }
}
