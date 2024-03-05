import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {ParticipationService} from "../../core/services/participation/participation.service";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {response} from "express";

interface BaseAnswer{
  label?: string,
  type: string,
  answer: string
}

interface EmailAnswer extends BaseAnswer{
  type: string,
  answer: string
}

interface ButtonState{
  title: string;
  confirmPhone: boolean;
}

@Component({
  selector: 'app-participation-with-conditions',
  templateUrl: './participation-with-conditions.component.html',
  styleUrl: './participation-with-conditions.component.scss'
})
export class ParticipationWithConditionsComponent{

  baseContestData: any;
  participationForm: FormGroup;
  buttonState: ButtonState = { title: 'participate', confirmPhone: false }

  answers: BaseAnswer[] = [];
  constructor(private fb: FormBuilder, private participationService: ParticipationService, private telegramService: TelegramService) {
    this.participationForm = this.fb.group({
      conditions: this.fb.array([])
    })
  }
  get conditions() {
    return this.participationForm.get('conditions') as FormArray;
  }

  addOwnCondition(data: any) {
    const condition = this.fb.group({
      label: data.label,
      type: 'ownCondition',
      answer: ['', Validators.required]
    });
    this.conditions.push(condition);
    console.log(this.conditions.value);
  }

  addGuessCondition(conditionType: string) {
    const condition = this.fb.group({
      label: 'Guess number',
      type: conditionType,
      answer: ['', Validators.required]
    });
    this.conditions.push(condition);
    console.log(this.conditions.value);
  }

  addEmailCondition() {
    const condition = this.fb.group({
      label: 'Enter email',
      type: 'email',
      answer: ['', Validators.required]
    });
    this.conditions.push(condition);
    console.log(this.conditions.value);
  }

  ngOnInit() {
    this.participationService.getCompetitionConditionSubject().subscribe((data) => {
      console.log(data.contestData)
      this.baseContestData = data.contestData;

      const contestConditionsData = JSON.parse(this.baseContestData.conditions);

      if(contestConditionsData.phoneNumber){
        this.buttonState.title = 'confirm number'
        this.buttonState.confirmPhone = true;
      }

      if(contestConditionsData.email){
        this.addEmailCondition()
      }

      if(contestConditionsData.ownCondition){
        contestConditionsData.otherConditions.forEach((condition: any) => {
          this.addOwnCondition(condition);
        })
      } else if(contestConditionsData.type){
        if(contestConditionsData.exact){
          this.addGuessCondition('exact');
        }else{
          this.addGuessCondition('closest');
        }
      }
    })
  }

  participate() {
    const values = this.participationForm.value.conditions;

    this.answers = values.map((answer: any) => ({
      type: ['email', 'exact', 'closest'].includes(answer.type) ? answer.type : answer.type,
      ...(answer.type !== 'email' && { label: answer.label }),
      answer: answer.answer
    }));

    const formData = new FormData();

    formData.append('user_id', this.baseContestData.user_id);
    formData.append('contest_id', this.baseContestData.contest_id);
    formData.append('username', this.baseContestData.username);
    formData.append('language', this.baseContestData.language);
    formData.append('bot_id', this.baseContestData.bot_id);
    formData.append('answer', JSON.stringify(this.answers));

    if(this.buttonState.confirmPhone){
      this.participationService.addParticipationWithPhone(formData).subscribe((response) => {
        this.telegramService.close();
      })
    }else{
      this.participationService.addParticipationWithAnswer(formData).subscribe((response) => {
        this.telegramService.close();
      })
    }
  }
}
