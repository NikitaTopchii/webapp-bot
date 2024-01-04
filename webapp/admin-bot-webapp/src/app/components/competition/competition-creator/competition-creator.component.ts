import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {CompetitionService} from "../../core/services/competition/competition.service";
import {NgForOf} from "@angular/common";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TokenGenerateService} from "../../core/services/token/token-generate.service";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {response} from "express";
import {finalize, Observable} from "rxjs";
@Component({
  selector: 'app-competition-creator',
  templateUrl: './competition-creator.component.html',
  styleUrl: './competition-creator.component.scss'
})
export class CompetitionCreatorComponent implements OnInit, OnDestroy{
  form: FormGroup;
  private selectedChannels: Set<TelegramEntityInterface> = new Set<TelegramEntityInterface>();
  private selectedChannelIds: string[] = [];
  private selectedChannelNames: string[] = [];

  private competitionToken: string = '';

  constructor(private readonly fb: FormBuilder,
              private telegram: TelegramService,
              private router: Router,
              private createCompetitionService: CompetitionService,
              private selectedChannelsService: SelectedChannelsService,
              private generateTokenService: TokenGenerateService) {

    this.goBack = this.goBack.bind(this);
    this.sendData = this.sendData.bind(this);

    console.log('THIS IS WORK')

    this.form = this.getCreateCompetitionForm();
  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      competitionName: ['', Validators.required],
      competitionDescription: [''],
      competitionDate: ['', Validators.required],
      competitionTime: ['', Validators.required],
      competitionWinnersCount: ['', Validators.required],
      languageSelector: ['en']
    });
  }

  getSelectedChannels(){
    return this.selectedChannels;
  }

  sendData(){
    this.telegram.sendData({ channels: 32124 });
  }

  goBack(){
    this.router.navigate(['/channels-list']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    console.log('THIS IS WORK ALSO')

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

    this.setCompetitionDrafts(form, competitionId).pipe(
      finalize(() => this.publishCompetitionInChannels(form, competitionId))
    ).subscribe((response) => {
      if(response){
        this.router.navigate(['/success']);
      }
    });
    //this.publishCompetitionInChannels(form, competitionId);
  }

  setCompetitionDrafts(form: FormGroup, competitionId: number):Observable<any>{
    const formData = new FormData();

    const competitionName = form.get('competitionName')?.value;
    const competitionDescription = form.get('competitionDescription')?.value;

    const expTime = form.get('competitionTime')?.value;

    const competitionDate = this.convertToISOFormat(form.get('competitionDate')?.value, expTime);

    const winner_count = form.get('competitionWinnersCount')?.value;

    const botid = localStorage.getItem('botid');

    const language = form.get('languageSelector')?.value;

    if(botid){
      formData.append('competitionName', competitionName);
      formData.append('competitionDescription', competitionDescription);
      formData.append('channels', this.selectedChannelIds.join(','));
      formData.append('conditions', 'subscribe');
      formData.append('contests_id', competitionId.toString());
      formData.append('finishTime', competitionDate);
      formData.append('winners_count', winner_count);
      formData.append('botid', botid);
      formData.append('language', language);
      formData.append('channelNames', this.selectedChannelNames.join(','))
    }

    return this.createCompetitionService.createCompetition(formData);
  }

  convertToISOFormat(dateString: string, expirationTimeString: string): string {
    // Розбиваємо вхідну дату і час на компоненти
    const dateComponents = dateString.split('/');
    const timeComponents = expirationTimeString.split(':');

    // Створюємо об'єкт Date
    const date = new Date(
      parseInt(dateComponents[2]), // Рік
      parseInt(dateComponents[1]) - 1, // Місяць (від 0 до 11)
      parseInt(dateComponents[0]), // День
      parseInt(timeComponents[0]), // Година
      parseInt(timeComponents[1]) // Хвилина
    );

    // Коригуємо час з урахуванням локального часового поясу користувача
    const timezoneOffset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - timezoneOffset);

    return date.toISOString();
  }

  publishCompetitionInChannels(form: FormGroup, competitionId: number){
    const formData = new FormData();

    const finishTime = '2023-12-31 06:45:42.000000';

    const expTime = form.get('competitionTime')?.value;

    const competitionDate = this.convertToISOFormat(form.get('competitionDate')?.value, expTime);

    const winner_count = form.get('competitionWinnersCount')?.value;

    formData.append('contest_id', competitionId.toString());
    formData.append('chatid', this.selectedChannelIds.join(','))
    formData.append('channels', this.selectedChannelIds.join(','));
    formData.append('finishTime', competitionDate);
    formData.append('conditions', 'subscribe');
    formData.append('winners_count', winner_count)

    this.createCompetitionService.publishCompetition(formData);
  }
}
