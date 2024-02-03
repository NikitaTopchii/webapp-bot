import { Component } from '@angular/core';
import { FormBuilder } from "@angular/forms";

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
  constructor(private fb: FormBuilder) {
  }

  public conditionForm = this.fb.group({
    conditionType: ['exact'],
    number: [null],
  });

  public radioOptions: RadioOption[] = [
    { label: 'Exact', value: 'exact' },
    { label: 'Closest', value: 'closest' },
  ];
}
