import { Component, Output } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { CompetitionCreatorService } from "../../services/competition-creator.service";

type ConditionType = 'exact' | 'closest';
interface RadioOption {
  label: string;
  value: ConditionType
}


@Component({
  selector: 'app-guess-number',
  templateUrl: './guess-number.component.html',
  styleUrl: './guess-number.component.scss'
})
export class GuessNumberComponent {
  constructor(private fb: FormBuilder,
              private competitionCreatorService: CompetitionCreatorService) {
    this.initValueChangeSubscription();
  }

  public conditionForm = this.fb.group({
    conditionType: ['exact'],
    number: [0],
  });

  public radioOptions: RadioOption[] = [
    { label: 'Exact', value: 'exact' },
    { label: 'Closest', value: 'closest' },
  ];

  private initValueChangeSubscription(): void {
    this.conditionForm.valueChanges.subscribe((value) => {
      this.competitionCreatorService.conditionRequest = {
        type: 'guess',
        exact: value.conditionType === 'exact',
        value: value.number || 0,
        subscription: true
      }
    });
  }
}
