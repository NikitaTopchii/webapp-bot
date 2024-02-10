import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CompetitionDetailsService } from "../../services/competition-details.service";
import { CompetitionCreatorService } from "../../../competition-creator/services/competition-creator.service";

@Component({
  selector: 'app-editable-competition-details',
  templateUrl: './editable-competition-details.component.html',
  styleUrl: './editable-competition-details.component.scss'
})
export class EditableCompetitionDetailsComponent implements OnInit {
  form: FormGroup;
  minDate: Date = new Date(Date.now());

  constructor(private fb: FormBuilder,
              private competitionCreatorService: CompetitionCreatorService){
    this.form = this.getEditableCompetitionForm();
  }

  ngOnInit() {
    this.initPatchValue();
  }

  private getEditableCompetitionForm(): FormGroup {
    return this.fb.group({
      competitionName: ['', Validators.maxLength(500)],
      competitionDescription: ['', Validators.maxLength(500)],
      media: [],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      competitionWinnersCount: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      competitionParticipant: []
    })
  }

  submitForm() {

  }

  private initPatchValue(): void {
    this.competitionCreatorService.conditionRequest = {
      email: true,
      otherConditions: [{label: 'test', type: 'text'}],
      ownCondition: true,
      phoneNumber: true,
      subscription: true,
      type: 'condition'
    }
  }
}
