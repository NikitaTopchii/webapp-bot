import { Component } from '@angular/core';
import { FormControl } from "@angular/forms";

type ConditionType = 'guess' | 'condition';
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
  public selectedOption: FormControl<ConditionType | null> = new FormControl('guess');

  public radioOptions: RadioOption[] = [
    { label: 'Guess', value: 'guess' },
    { label: 'Condition', value: 'condition' },
  ];

}
