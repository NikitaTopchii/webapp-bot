import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {CompetitionCreatorService} from "../../../competition-creator/services/competition-creator.service";

@Component({
  selector: 'app-readonly-competition-details',
  templateUrl: './readonly-competition-details.component.html',
  styleUrl: './readonly-competition-details.component.scss'
})
export class ReadonlyCompetitionDetailsComponent implements OnChanges {
  @Input() public currentContest: any = {};
  public isDraft$: Observable<boolean> = this.route.queryParams.pipe(
    map(params => Boolean(params['type'] === 'DRAFT') || false));


  constructor(private route: ActivatedRoute,
              private competitionCreatorService: CompetitionCreatorService) {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes?.['currentContest'] && this?.currentContest?.conditions) {
      this.competitionCreatorService.conditionRequest = JSON.parse(this.currentContest.conditions)
    }
  }


}
