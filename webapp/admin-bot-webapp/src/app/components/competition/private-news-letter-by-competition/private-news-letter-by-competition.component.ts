import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {CompetitionService} from "../../core/services/competition/competition.service";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {TokenGenerateService} from "../../core/services/token/token-generate.service";
import {DateTimeValidatorService} from "../../core/services/date-time-validator.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgForOf, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {ActiveCompetitionInterface} from "../../core/active-competition.interface";

@Component({
  selector: 'app-private-news-letter-by-competition',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './private-news-letter-by-competition.component.html',
  styleUrl: './private-news-letter-by-competition.component.scss'
})
export class PrivateNewsLetterByCompetitionComponent implements OnInit, OnDestroy{
  form: FormGroup;

  imageUrls: string[] = [];

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
      newsLetterMessage: [''],
      startDate: ['', Validators.required],
      competitionStartTime: [this.currentTime, Validators.required],
      percentEndpointUsers: ['', Validators.required],
      languageSelector: ['en'],
      imagesLinks: ['', Validators.required],
    });
  }

  sendCompetitionDataToBot(form: FormGroup){
    this.sendData(this.getNewsLetterData(form));
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result)
          this.imageUrls.push(e.target.result); // e.target.result містить Data URL
        };
        reader.readAsDataURL(file);
      }
    }
  }

  getNewsLetterData(form: FormGroup){
    return {
      type: 'private-news-letter',
      contestDescription: form.get('newsLetterMessage')?.value,
      competitionStartDate: this.dateTimeValidationService.checkDateValidation(
        form.get('startDate')?.value,
        form.get('competitionStartTime')?.value
      ),
      percentUsers: form.get('percentEndpointUsers')?.value,
      botid: this.activeCompetition?.botId,
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
