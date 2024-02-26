import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormGroupName, Validators} from "@angular/forms";
import { CompetitionCreatorService } from "../../services/competition-creator.service";

@Component({
  selector: 'app-data-condition',
  templateUrl: './data-condition.component.html',
  styleUrl: './data-condition.component.scss'
})
export class DataConditionComponent {
  public pidor: number = 0;
  public dataConditionForm: FormGroup = this.getDataConditionForm();

  constructor(private fb: FormBuilder,
              private competitionCreatorService: CompetitionCreatorService) {
    this.initValueChangeSubscription();
    this.initPatchValue();
  }

  public get otherConditions() {
    return this.dataConditionForm.get('otherConditions') as FormArray;
  }


  public addOtherCondition() {
    if(this.otherConditions.length < 3) {
      this.otherConditions.push(this.getOtherConditionFormControl());
    }

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

  private initPatchValue() {
    this.competitionCreatorService.conditionRequest$.subscribe(data => {
      if (data.type === 'condition') {
        this.dataConditionForm.patchValue({
          email: data.email,
          phoneNumber: data.phoneNumber,
          ownCondition: data.ownCondition,
        }, { emitEvent: false });
        this.otherConditions.clear();
        data.otherConditions.forEach(condition => {
          this.otherConditions.push(this.fb.group(condition));
        });
      }
    })
  }

  protected readonly FormGroupName = FormGroupName;
}
