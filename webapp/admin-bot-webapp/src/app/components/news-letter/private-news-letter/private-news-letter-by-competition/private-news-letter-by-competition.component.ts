import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TelegramService} from "../../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {CompetitionService} from "../../../core/services/competition/competition.service";
import {DateTimeValidatorService} from "../../../core/services/validators/date-time/date-time-validator.service";
import {ActiveCompetitionInterface} from "../../../core/active-competition.interface";

@Component({
  selector: 'app-private-news-letter-by-competition',
  templateUrl: './private-news-letter-by-competition.component.html',
  styleUrl: './private-news-letter-by-competition.component.scss'
})
export class PrivateNewsLetterByCompetitionComponent implements OnInit, OnDestroy{
  form: FormGroup;

  private activeCompetition: ActiveCompetitionInterface | undefined;

  failedDateValidation = false;

  currentTime: string = this.dateTimeValidationService.getCurrentTime();

  constructor(private readonly fb: FormBuilder,
              private telegram: TelegramService,
              private router: Router,
              private competitionService: CompetitionService,
              private dateTimeValidationService: DateTimeValidatorService) {

    this.goBack = this.goBack.bind(this);
    this.sendData = this.sendData.bind(this);

    this.competitionService.getActiveCompetition().subscribe((competition) => {
      this.activeCompetition = competition;
    })

    this.form = this.getCreateCompetitionForm();
  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      newsLetterMessage: ['Your message', [Validators.required, Validators.maxLength(1024)]],
      startDate: ['', Validators.required],
      competitionStartTime: [this.currentTime, [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      languageSelector: ['ru'],
      imagesLinks: ['', Validators.required],
    });
  }

  sendCompetitionDataToBot(form: FormGroup){
    console.log(this.getNewsLetterData(form));
    this.sendData(this.getNewsLetterData(form));
  }

  getNewsLetterData(form: FormGroup){
    console.log(this.activeCompetition)
    return {
      type: 'private-news-letter',
      contestDescription: form.get('newsLetterMessage')?.value,
      competitionStartDate: this.dateTimeValidationService.checkDateValidation(
        form.get('startDate')?.value,
        form.get('competitionStartTime')?.value
      ),
      language: form.get('languageSelector')?.value,
      contestId: this.activeCompetition?.contestId,
      chatId: this.activeCompetition?.chatId,
      urls: form.get('imagesLinks')?.value,
    }
  }

  pushNewsLetter(form: FormGroup) {
    this.sendCompetitionDataToBot(form);
  }

  sendData(data: any){
    this.telegram.sendData(data);
  }

  goBack(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }
}
