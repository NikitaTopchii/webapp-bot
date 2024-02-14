import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-readonly-competition-details',
  templateUrl: './readonly-competition-details.component.html',
  styleUrl: './readonly-competition-details.component.scss'
})
export class ReadonlyCompetitionDetailsComponent implements OnChanges {
  @Input() public currentContest: any = {};

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }
}
