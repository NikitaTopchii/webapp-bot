import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import {ParticipationService} from "../../core/services/participation/participation.service";
import {TelegramService} from "../../core/services/telegram/telegram.service";

interface BaseAnswer{
  label?: string,
  type: string,
  answer: string
}

interface EmailAnswer extends BaseAnswer{
  type: string,
  answer: string
}

@Component({
  selector: 'app-participation-with-conditions',
  templateUrl: './participation-with-conditions.component.html',
  styleUrl: './participation-with-conditions.component.scss'
})
export class ParticipationWithConditionsComponent{

  baseContestData: any;
  participationForm: FormGroup;

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

    console.log(values)

    values.forEach((answer: any) => {
      if(answer.type === 'email'){
        this.answers.push({
          type: answer.type,
          answer: answer.answer
        })
      } else if(answer.type === 'exact' || answer.type === 'closest') {
        this.answers.push({
          type: answer.type,
          answer: answer.answer
        })
      } else {
        this.answers.push({
          label: answer.label,
          type: answer.type,
          answer: answer.answer
        })
      }
    })

    console.log(this.answers)

    const formData = new FormData();

    formData.append('user_id', this.baseContestData.user_id);
    formData.append('contest_id', this.baseContestData.contest_id);
    formData.append('username', this.baseContestData.username);
    formData.append('answer', JSON.stringify(this.answers));

    this.participationService.addParticipationWithAnswer(formData).subscribe((response) => {
      this.telegramService.close();
    })
  }
}
