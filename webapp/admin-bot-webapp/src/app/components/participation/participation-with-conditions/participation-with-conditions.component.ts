import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ParticipationService} from "../../core/services/participation/participation.service";
import {response} from "express";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
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

  conditionsValueEmail: any;
  conditionsValuePhone: any;
  conditionsValueSelfCondition: any;
  conditionsGuessNumber: any;

  successParticipation: boolean = false;
  enterAnswer: boolean = true;

  constructor(private fb: FormBuilder, private participationService: ParticipationService) {
    this.form = this.getParticipationForm();
  }

  ngOnInit() {
    this.participationService.getCompetitionConditionSubject().subscribe((contestData) => {
      this.contestData = contestData.contestData;
      this.checkConditionsType(contestData.contestData);
    })
  }

  ngOnDestroy() {
  }

  getParticipationForm(){
    return this.fb.group({
      email: [''],
      phone: [''],
      selfAnswer: [''],
      guessedNumber: ['']
    });
  }

  addParticipation(form: FormGroup) {

    this.enterAnswer = false;

    this.contestData.delete('answer')

    const guessedNumber = form.get('guessedNumber')?.value;

    if(guessedNumber){
      this.contestData.append('answer', guessedNumber);
    }else{
      const answer = {
        email: form.get('email')?.value,
        phone: form.get('phone')?.value,
        selfAnswer: form.get('selfAnswer')?.value
      }

      this.contestData.append('answer', JSON.stringify(answer));
    }

    this.successParticipation = false;

    this.participationService.addParticipationWithAnswer(this.contestData).subscribe((response) => {
      if(response){
        this.successParticipation = true;
      }
    });
  }

  checkConditionsType(contestData: FormData){

    const conditions = contestData.get('conditions');
    const answer = contestData.get('answer');

    if(conditions){
      const conditionsType = conditions.toString().split(',');

      conditionsType.forEach((type) => {
        this.setValues(type, answer);
      })
    }
  }

  setValues(conditionsType: string, answer: FormDataEntryValue | null){
    if((conditionsType === 'media' || conditionsType === 'text' || conditionsType === 'links' || conditionsType === 'number') && answer){
      this.conditionsValueSelfCondition = answer.toString();
      this.conditionsType = 'self';
    }else{
      if(conditionsType === 'emailCondition'){
        this.conditionsType = 'email';
        this.conditionsValueEmail = 'Enter your email'
      }else if(conditionsType === 'phoneCondition'){
        this.conditionsType = 'number'
        this.conditionsValuePhone = 'Enter your phone number'
      }else if(conditionsType === 'exact' || conditionsType === 'closest'){
        this.conditionsGuessNumber = 'Enter number for guess'
        this.conditionsType = 'guessNumber'
      }else{
        this.conditionsType = 'unknown condition'
      }
    }
  }
}
