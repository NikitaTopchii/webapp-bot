import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompetitionCreatorService } from "../../services/competition-creator.service";


type ConditionType = 'text' | 'image' | 'link' | 'video' | 'number';

@Component({
  selector: 'app-data-condition',
  templateUrl: './data-condition.component.html',
  styleUrl: './data-condition.component.scss'
})
export class DataConditionComponent {
  public dataConditionForm: FormGroup = this.getDataConditionForm();

  constructor(private fb: FormBuilder,
              private competitionCreatorService: CompetitionCreatorService) {
    this.initValueChangeSubscription();
  }

  public get otherConditions() {
    return this.dataConditionForm.get('otherConditions') as FormArray;
  }


  public addOtherCondition() {
    this.otherConditions.push(this.getOtherConditionFormControl());
  }

  public removeOtherCondition(i: number) {
    this.otherConditions.removeAt(i);
  }

  public submit() {
    if (this.dataConditionForm.invalid) {
      return;
    }
  }

  private getDataConditionForm() {
    return this.fb.group({
      email: [false],
      phoneNumber: [false],
      ownCondition: [false],
      otherConditions: this.fb.array([this.getOtherConditionFormControl()]),
    })
  }

  private getOtherConditionFormControl() {
    return this.fb.group({
      label: ['', Validators.required],
      type: 'text'
    });
  }

  private initValueChangeSubscription() {
    this.dataConditionForm.valueChanges.subscribe((value) => {
      this.competitionCreatorService.conditionRequest = {...value, subscription: true};
    });
  }
}
