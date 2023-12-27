import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {CreateCompetitionService} from "../../core/services/create-competition/create-competition.service";

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
              private router: Router,
              private createCompetitionService: CreateCompetitionService) {

    this.form = this.getCreateCompetitionForm();
  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      competitionName: ['', Validators.required],
      competitionDescription: ['']
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

  createCompetition(form: FormGroup) {
    const formData = new FormData();

    const competitionName = form.get('competitionName')?.value;
    const competitionDescription = form.get('competitionDescription')?.value;

    formData.append('competitionName', competitionName);
    formData.append('competitionDescription', competitionDescription);
    formData.append('channels', 'channels');
    formData.append('conditions', 'subscribe');
    formData.append('contests_id', '2410');

    this.createCompetitionService.createCompetition(formData);
  }
}
