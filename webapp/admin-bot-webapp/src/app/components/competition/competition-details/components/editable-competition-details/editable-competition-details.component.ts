import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-editable-competition-details',
  templateUrl: './editable-competition-details.component.html',
  styleUrl: './editable-competition-details.component.scss'
})
export class EditableCompetitionDetailsComponent implements OnInit {
  form: FormGroup;
  minDate: Date = new Date(Date.now());

  constructor(private readonly fb: FormBuilder,) {
    this.form = this.getEditableCompetitionForm();
  }

  ngOnInit() {
  }

  private getEditableCompetitionForm(): FormGroup {
    return this.fb.group({
      competitionName: [],

    })
  }





}
