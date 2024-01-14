import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {CompetitionService} from "../../core/services/competition/competition.service";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {TokenGenerateService} from "../../core/services/token/token-generate.service";
import {DateTimeValidatorService} from "../../core/services/date-time-validator.service";

@Component({
  selector: 'app-public-news-letter-by-chat',
  standalone: true,
    imports: [
        MatDatepickerModule,
        MatFormFieldModule,
        NgForOf,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './public-news-letter-by-chat.component.html',
  styleUrl: './public-news-letter-by-chat.component.scss'
})
export class PublicNewsLetterByChatComponent implements OnInit, OnDestroy{
  form: FormGroup;
  private selectedChannels: Set<TelegramEntityInterface> = new Set<TelegramEntityInterface>();
  private selectedChannelIds: string[] = [];
  private selectedChannelNames: string[] = [];

  failedDateValidation = false;
  failedTimeValidation = false;
  wrong = false;
  currentTime: string = this.dateTimeValidationService.getCurrentTime();

  constructor(private readonly fb: FormBuilder,
              private telegram: TelegramService,
              private router: Router,
              private createCompetitionService: CompetitionService,
              private selectedChannelsService: SelectedChannelsService,
              private generateTokenService: TokenGenerateService,
              private dateTimeValidationService: DateTimeValidatorService) {

    this.goBack = this.goBack.bind(this);
    this.sendData = this.sendData.bind(this);

    console.log(this.currentTime)
    this.form = this.getCreateCompetitionForm();
  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      competitionName: ['', Validators.required],
      competitionDescription: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      competitionStartTime: [this.currentTime, Validators.required],
      competitionFinishTime: ['', Validators.required],
      competitionWinnersCount: ['', Validators.required],
      languageSelector: ['en'],
    });
  }

  handleDateChanged(eventName: string, event: any) {
    // this only logs if the user changes the inputs via the UI but not if the form controls are // modified
    console.log(`daterange change event:${eventName}`, event.value);
  }

  getSelectedChannels(){
    return this.selectedChannels;
  }

  sendData(data: any){
    this.telegram.sendData(data);
  }

  goBack(){
    this.router.navigate(['/channels-list']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {

    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);

    this.selectedChannelsService.getSelectedChannels().subscribe((channels) => {
      this.selectedChannels = channels;

      this.selectedChannels.forEach((channel) => {
        this.selectedChannelIds.push(channel.id);
        this.selectedChannelNames.push(channel.name);
      })
    })
  }

  createCompetition(form: FormGroup) {
    const competitionId = this.generateTokenService.generateSHA256Token();

    console.log('CREATE COMPETITION')

    const formData = new FormData();
    console.log('CREATE COMPETITION')

    const botid = localStorage.getItem('botid');

    if(botid){
      console.log(botid)
      formData.append('botid', botid);
    }
    this.createCompetitionService.createCompetition(formData).subscribe(() => {
      console.log("BOT TOKEN WAS GETTING")
      this.sendCompetitionDataToBot(form, competitionId);
    });
    //this.sendData(this.getCompetitionData(form, competitionId));

    // this.setCompetitionDrafts(form, competitionId).pipe(
    //   finalize(() => this.publishCompetitionInChannels(form, competitionId))
    // ).subscribe((response) => {
    //   if(response){
    //     this.sendData(this.getCompetitionData(form, competitionId));
    //     this.router.navigate(['/success']);
    //   }
    // });
  }

  sendCompetitionDataToBot(form: FormGroup, competitionId: number){
    this.sendData(this.getCompetitionData(form, competitionId));
  }

  getCompetitionData(form: FormGroup, competitionId: number){
    return {
      contestName: form.get('competitionName')?.value,
      contestDescription: form.get('competitionDescription')?.value,
      channels: this.selectedChannelIds.join(','),
      competitionStartDate: this.dateTimeValidationService.checkDateValidation(
        form.get('startDate')?.value,
        form.get('competitionStartTime')?.value
      ),
      competitionFinishDate: this.dateTimeValidationService.checkDateValidation(
        form.get('endDate')?.value,
        form.get('competitionFinishTime')?.value
      ),
      winnerCount: form.get('competitionWinnersCount')?.value,
      botid: localStorage.getItem('botid'),
      language: form.get('languageSelector')?.value,
      contestId: competitionId.toString(),
      channelNames: this.selectedChannelNames.join(',')
    }
  }

  setCompetitionDrafts(){
    const formData = new FormData();
    console.log('CREATE COMPETITION')

    const botid = localStorage.getItem('botid');

    if(botid){
      console.log(botid)
      formData.append('botid', botid);
    }
    this.createCompetitionService.createCompetition(formData);
  }

  publishCompetitionInChannels(form: FormGroup, competitionId: number){
    const formData = new FormData();

    const competitionDate = this.dateTimeValidationService.checkDateValidation(
      form.get('competitionDate')?.value,
      form.get('competitionTime')?.value
    );

    if(!competitionDate){
      this.failedDateValidation = true;
    }

    const winner_count = form.get('competitionWinnersCount')?.value;

    const language = form.get('languageSelector')?.value;

    formData.append('contest_id', competitionId.toString());
    formData.append('chatid', this.selectedChannelIds.join(','))
    formData.append('channels', this.selectedChannelIds.join(','));
    formData.append('finishTime', competitionDate);
    formData.append('conditions', 'subscribe');
    formData.append('winners_count', winner_count);
    formData.append('language', language);

    this.createCompetitionService.publishCompetition(formData);
  }
}

