import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";
import { CompetitionCreatorService } from "../../services/competition-creator.service";

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

  public radioOptions: RadioOption[] = [
    { label: 'Nothing', value: 'nothing'},
    { label: 'Guess', value: 'guess' },
    { label: 'Condition', value: 'condition' },
  ];

  constructor(private competitionCreatorService: CompetitionCreatorService) {
    this.competitionCreatorService.setSubscribeCondition();
    this.initValueChangeSubscription();
  }

  private initValueChangeSubscription() {
    this.selectedOption.valueChanges.subscribe((value) => {
      if (value === 'guess') {
        this.competitionCreatorService.setDefaultGuessNumber();
      } else if (value === 'nothing') {
        this.competitionCreatorService.setSubscribeCondition();
      } else {
        this.competitionCreatorService.setDefaultSelfCondition();
      }
    })
  }

}
