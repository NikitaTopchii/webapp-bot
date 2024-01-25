import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParticipationService} from "../../core/services/participation/participation.service";
import {response} from "express";
@Component({
  selector: 'app-participation-with-conditions',
  templateUrl: './participation-with-conditions.component.html',
  styleUrl: './participation-with-conditions.component.scss'
})
export class ParticipationWithConditionsComponent implements OnInit, OnDestroy{

  form: FormGroup;
  conditions: string | undefined;
  answer: string | undefined;

  contestData: FormData = new FormData();

  conditionsType: File | string = '';
  conditionsValue: File | string = '';

  successParticipation: boolean = false;
  enterAnswer: boolean = true;

  constructor(private fb: FormBuilder, private participationService: ParticipationService) {
    this.form = this.getParticipationForm();
  }

  getParticipationForm(){
    return this.fb.group({
      answer: ['', Validators.required],
    });
  }

  addParticipation(form: FormGroup) {

    this.enterAnswer = false;

    this.contestData.delete('answer')

    this.contestData.append('answer', form.get('answer')?.value);

    console.log('++++++++++')
    console.log(this.contestData)
    console.log('++++++++++')

    this.successParticipation = false;

    this.participationService.addParticipationWithAnswer(this.contestData).subscribe((response) => {
      if(response){
        this.successParticipation = true;
      }
    });
  }

  checkConditionsType(contestData: FormData){

    const conditionsType = contestData.get('conditions');
    const answer = contestData.get('answer');

    console.log('============')
    console.log(conditionsType)
    console.log(answer)
    console.log('============')

    if((conditionsType === 'self,media' || conditionsType === 'self,text' || conditionsType === 'self,links' || conditionsType === 'self,number') && answer){
      console.log('type self')
      this.conditionsValue = answer;
      this.conditionsType = 'self';
    }else{
      if(conditionsType === 'email'){
        console.log('type email');
        this.conditionsType = 'email';
        this.conditionsValue = 'Enter your email'
      }else if(conditionsType === 'number'){
        console.log('type number')
        this.conditionsType = 'number'
        this.conditionsValue = 'Enter your phone number'
      }else if(conditionsType === 'exact' || conditionsType === 'closest'){
        console.log('guessNumber')
        this.conditionsValue = 'Enter number for guess'
        this.conditionsType = 'guessNumber'
      }else{
        console.log('ХЗ ЧО У ВАС ТАМ ПРОИСХОДИТ')
        this.conditionsType = 'unknown condition'
      }
    }
  }

  ngOnInit() {
    this.participationService.getCompetitionConditionSubject().subscribe((contestData) => {
      console.log('NG ON INIT NAHUI')
      console.log(contestData.contestData)
      console.log('NG ON INIT NAHUI END')
      this.contestData = contestData.contestData;
      this.checkConditionsType(contestData.contestData);
    })
  }

  ngOnDestroy() {
  }
}
