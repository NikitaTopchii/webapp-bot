import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {CompetitionDetailsService} from "../../services/competition-details.service";

@Component({
  selector: 'app-readonly-competition-details',
  templateUrl: './readonly-competition-details.component.html',
  styleUrl: './readonly-competition-details.component.scss'
})
export class ReadonlyCompetitionDetailsComponent implements OnChanges {
  @Input() public currentContest: any = {};
  @Input() isDraft$: Observable<boolean> = this.route.queryParams.pipe(
    map(params => Boolean(params['type'] === 'DRAFT') || false));


  constructor(private route: ActivatedRoute) {
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }


}
