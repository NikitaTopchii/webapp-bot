import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-competition-creator',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './competition-creator.component.html',
  styleUrl: './competition-creator.component.scss'
})
export class CompetitionCreatorComponent {
  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.getCreateCompetitionForm();
  }
  createNewCompetition(form: FormGroup) {

  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      competitionName: ["", [Validators.required]],
    });
  }
}
