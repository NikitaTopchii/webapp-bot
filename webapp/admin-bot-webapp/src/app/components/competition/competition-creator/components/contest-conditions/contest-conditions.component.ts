import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { CompetitionCreatorService } from "../../services/competition-creator.service";
import {combineLatest, take} from "rxjs";

type ConditionType = 'guess' | 'condition' | 'nothing';
interface RadioOption {
  label: string;
  value: ConditionType
}

@Component({
  selector: 'app-contest-conditions',
  templateUrl: './contest-conditions.component.html',
  styleUrl: './contest-conditions.component.scss'
})
export class ContestConditionsComponent {
  public selectedOption: FormControl<ConditionType | null> = new FormControl('nothing');
  public participant: FormControl<number | null> = new FormControl<number | null>(1);


  public radioOptions: RadioOption[] = [
    { label: 'Nothing', value: 'nothing'},
    { label: 'Guess', value: 'guess' },
    { label: 'Condition', value: 'condition' },
  ];

  constructor(private competitionCreatorService: CompetitionCreatorService) {
    this.competitionCreatorService.setSubscribeCondition({});
    this.initValueChangeSubscription();
    this.patchValue();
  }

  private initValueChangeSubscription() {
    combineLatest([this.selectedOption.valueChanges, this.participant.valueChanges])
      .subscribe(([value, participantAmount]) => {
        if (value === 'guess') {
          if (participantAmount) {
            this.competitionCreatorService.setDefaultGuessNumber({participantAmount});
          } else {
            this.competitionCreatorService.setDefaultGuessNumber({});
          }
        } else if (value === 'nothing') {
          if (participantAmount) {
            this.competitionCreatorService.setSubscribeCondition({participantAmount});
          } else {
            this.competitionCreatorService.setSubscribeCondition({});
          }
        } else {
          if (participantAmount) {
            this.competitionCreatorService.setDefaultSelfCondition({participantAmount});
          } else {
            this.competitionCreatorService.setDefaultSelfCondition({});
          }
        }
      })
    // this.selectedOption.valueChanges.subscribe((value) => {
    //
    // })
  }

  private patchValue(): void {
    this.competitionCreatorService.conditionRequest$.pipe(take(2)).subscribe(value => {
      this.selectedOption.setValue(value.type, {emitEvent: false});
      this.participant.setValue(value.participantAmount)
    })
  }
}
