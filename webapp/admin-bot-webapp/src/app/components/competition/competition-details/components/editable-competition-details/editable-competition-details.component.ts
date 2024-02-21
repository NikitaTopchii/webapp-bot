import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CompetitionCreatorService } from "../../../competition-creator/services/competition-creator.service";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";
import {CompetitionDetailsService} from "../../services/competition-details.service";


@Component({
  selector: 'app-editable-competition-details',
  templateUrl: './editable-competition-details.component.html',
  styleUrl: './editable-competition-details.component.scss'
})
export class EditableCompetitionDetailsComponent implements OnInit, OnChanges {
  @Input() public currentContest: any;
  form: FormGroup;
  minDate: Date = new Date(Date.now());
  public isDraft$: Observable<boolean> = this.route.queryParams.pipe(
    map(params => Boolean(params['type'] === 'DRAFT') || false));


  constructor(private fb: FormBuilder,
              private competitionDetailsService: CompetitionDetailsService,
              private competitionCreatorService: CompetitionCreatorService,
              private route: ActivatedRoute){
    this.form = this.getEditableCompetitionForm();
  }

  ngOnInit() {
    this.initPatchValue();
  }

  ngOnChanges() {
    this.initPatchValue();
  }


  private getEditableCompetitionForm(): FormGroup {
    return this.fb.group({
      contestName: ['', Validators.maxLength(500)],
      contestDescription: ['', Validators.maxLength(500)],
      media: [],
      start_time: ['', Validators.required],
      finish_time: ['', Validators.required],
      winner_amount: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      competitionParticipant: []
    })
  }

  updateCompetition() {
    let formData = new FormData();
    const { answer, channels, language } = this.currentContest;
    const contestId = this.route.snapshot.params['competitionId'];
    let updatedContest = { ...this.form.value, answer, channels, language, contestId: contestId, conditions: JSON.stringify(this.competitionCreatorService.conditionRequest) };
    for (let key in updatedContest) {
      formData.append(key, updatedContest[key]);
    }

    const updateObservable =
      this.route.snapshot.queryParams['type'] === 'DRAFT'
        ? this.competitionDetailsService.updateDraftCompetition(updatedContest)
        : this.competitionDetailsService.updateDelayedCompetition(updatedContest);

    const subscription = updateObservable.subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  private initPatchValue(): void {
    if(this.currentContest) {
      const {name, description, start_time, finish_time, winners_amount, conditions} = this.currentContest;
      this.competitionCreatorService.conditionRequest = JSON.parse(conditions)

      this.form.patchValue({
        contestName: name, contestDescription: description, start_time, finish_time, winner_amount: winners_amount,
        competitionParticipant: this.currentContest?.amount_participiant || 0
      });
    }
  }
}
