import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-editable-competition-details',
  templateUrl: './editable-competition-details.component.html',
  styleUrl: './editable-competition-details.component.scss'
})
export class EditableCompetitionDetailsComponent implements OnInit {
  form: FormGroup;
  minDate: Date = new Date(Date.now());

  constructor(private fb: FormBuilder,) {
    this.form = this.getEditableCompetitionForm();
  }

  ngOnInit() {
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





}
