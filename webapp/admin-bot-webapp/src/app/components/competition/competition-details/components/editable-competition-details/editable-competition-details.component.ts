import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { CompetitionCreatorService } from "../../../competition-creator/services/competition-creator.service";
import {CompetitionDetailsService} from "../../services/competition-details.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-editable-competition-details',
  templateUrl: './editable-competition-details.component.html',
  styleUrl: './editable-competition-details.component.scss'
})
export class EditableCompetitionDetailsComponent implements OnInit, OnChanges {
  @Input() public currentContest: any;
  @Output() public isDraftChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  minDate: Date = new Date(Date.now());

  constructor(private fb: FormBuilder,
              private competitionCreatorService: CompetitionCreatorService,
              private competitionDetalisService: CompetitionDetailsService,
              private route: ActivatedRoute){
    this.form = this.getEditableCompetitionForm();
  }

  ngOnInit() {
    this.initPatchValue();
    console.log(this.currentContest)
  }

  ngOnChanges() {
    this.initPatchValue();
    console.log(this.currentContest)
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

    if(this.currentContest) {
      const {name, description, start_time, finish_time, winners_amount} = this.currentContest;

      this.form.patchValue({
        contestName: name, contestDescription: description, start_time, finish_time, winner_amount: winners_amount,
        competitionParticipant: this.currentContest?.amount_participiant || 0
      });
    }
  }

  onUpdateDelayedCompetition() {
    let formData = new FormData();
    const {answer, channels, language} = this.currentContest
    const contestId = this.route.snapshot.params['competitionId'];
    let updatedContest = { ...this.form.value, answer, channels, language, contestId: contestId, conditions: JSON.stringify(this.competitionCreatorService.conditionRequest) };
    for (let key in updatedContest) {
      formData.append(key, updatedContest[key]);
    }

    this.competitionDetalisService.updateDelayedCompetition(formData).subscribe(data => {
      console.log('fucking request');
    })
  }
}
