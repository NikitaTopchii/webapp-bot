import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-competition-creator',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './competition-creator.component.html',
  styleUrl: './competition-creator.component.scss'
})
export class CompetitionCreatorComponent implements OnInit, OnDestroy{
  form: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private telegram: TelegramService,
              private router: Router) {

    this.form = this.getCreateCompetitionForm();
  }
  createNewCompetition(form: FormGroup) {

  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      competitionName: ["", [Validators.required]],
    });
  }

  goBack(){
    this.router.navigate(['channels-list']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }
}
