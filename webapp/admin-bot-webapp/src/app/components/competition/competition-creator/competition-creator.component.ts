import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {CompetitionService} from "../../core/services/competition/competition.service";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TokenGenerateService} from "../../core/services/token/token-generate.service";
import {DateTimeValidatorService} from "../../core/services/validators/date-time/date-time-validator.service";
import { FileValidatorService } from "../../core/services/validators/file/file-validator.service";
import {main_url} from "../../shared/application-context";
import {ConditionInterface} from "../../core/condition.interface";
type ConditionType = 'contestMedia' | 'contestDate' | 'contestTime' | 'contestWinnersCount' | 'contestLanguage' | 'contestCondition';

type VisibilityState = {
  [key in ConditionType]: boolean;
};

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

  currentTime: string = this.dateTimeValidationService.getCurrentTime();

  public visibilityState: VisibilityState = {
    contestMedia: false,
    contestDate: false,
    contestTime: false,
    contestWinnersCount: false,
    contestLanguage: false,
    contestCondition: false
  }

  minDate: Date = new Date(Date.now());

  constructor(private readonly fb: FormBuilder,
              private telegram: TelegramService,
              private router: Router,
              private createCompetitionService: CompetitionService,
              private selectedChannelsService: SelectedChannelsService,
              private generateTokenService: TokenGenerateService,
              private dateTimeValidationService: DateTimeValidatorService,
              private fileValidatorService: FileValidatorService) {
    this.goBack = this.goBack.bind(this);
    this.sendData = this.sendData.bind(this);

    console.log(this.currentTime)
    this.form = this.getCreateCompetitionForm();
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

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }


  public changeVisibilityState(conditionType: ConditionType, newValue?: boolean): void {
    if (newValue) {
      this.visibilityState[conditionType] = newValue;
      return;
    }
    this.visibilityState[conditionType] = !this.visibilityState[conditionType];
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];

    const formData = new FormData();

    formData.append('media', file);

    this.form.patchValue({ media: file });

    this.createCompetitionService.uploadMedia(formData);
  }

  getFieldValue(form: FormGroup, field: string) {
    return form.get(field)?.value;
  }

  getContestCondition(form: FormGroup) {
    const conditionSelector = this.getFieldValue(form, 'selectedCondition');

    console.log(conditionSelector);

    if(conditionSelector === 'condition'){
      const emailCondition = this.getFieldValue(form, 'emailCondition') ? 'emailCondition' : '';
      const phoneCondition = this.getFieldValue(form, 'phoneCondition') ? 'phoneCondition' : '';
      const selfCondition = this.getFieldValue(form, 'selfCondition') ? this.getFieldValue(form, 'selfConditionTypes') : '';

      const condition: ConditionInterface = {
        emailCondition: emailCondition,
        phoneCondition: phoneCondition,
        selfCondition: selfCondition,
        guessNumber: ''
      }

      return JSON.stringify(condition);
    }else if(conditionSelector === 'guess number'){
      const condition: ConditionInterface = {
        emailCondition: '',
        phoneCondition: '',
        selfCondition: '',
        guessNumber: this.getFieldValue(form, 'guessNumberCondition')
      }

      return JSON.stringify(condition);
    }
    return 'subscribe';
  }

  getContestConditionAnswer(form: FormGroup) {
    const selfConditionSelector = this.getFieldValue(form, 'selfCondition');

    if (selfConditionSelector) {
      return this.getFieldValue(form, 'selfConditionName');
    } else {
      return this.getFieldValue(form, 'guessNumber');
    }
  }


  handleDateChanged(eventName: string, event: any) {
    // this only logs if the user changes the inputs via the UI but not if the form controls are // modified
    console.log(`daterange change event:${eventName}`, event.value);
  }

  getSelectedChannels(){
    return this.selectedChannels;
  }

  sendData(data: FormData){
    this.createCompetitionService.createContest(data);
    //console.log(data)
    //this.telegram.sendData(data);
  }

  goBack(){
    this.router.navigate(['/competition-endpoint-selector']);
  }

  createCompetition(form: FormGroup) {
    const competitionId = this.generateTokenService.generateSHA256Token();

    console.log('CREATE COMPETITION')

    console.log(form.value);
    return;

    const formData = this.getCompetitionData(form, competitionId)

    this.createCompetitionService.createCompetitionDraft(formData).subscribe(() => {
      console.log('CONTEST DRAFT WAS CREATE')
      this.sendCompetitionDataToBot(this.getCompetitionData(form, competitionId));
    });
  }

  sendCompetitionDataToBot(data: any){
    this.sendData(data);
  }

  getCompetitionData(form: FormGroup, competitionId: number){

    const formData = new FormData();

    const botId = localStorage.getItem('botid');
    const userId = localStorage.getItem('user_id');

    if(botId && userId){
      formData.append('type', 'create-contest')
      formData.append('contestName', form.get('competitionName')?.value)
      formData.append('contestDescription', form.get('competitionDescription')?.value)
      formData.append('channels', this.selectedChannelIds.join(','))
      formData.append('competitionStartDate', this.dateTimeValidationService.checkDateValidation(
        form.get('startDate')?.value,
        form.get('competitionStartTime')?.value
      ))
      formData.append('competitionFinishDate', this.dateTimeValidationService.checkDateValidation(
        form.get('endDate')?.value,
        form.get('competitionFinishTime')?.value
      ))
      formData.append('media', form.get('media')?.value.name ? main_url + '/media/' + form.get('media')?.value.name : '')
      formData.append('winnerCount', form.get('competitionWinnersCount')?.value)
      formData.append('botid', botId)
      formData.append('language', form.get('languageSelector')?.value)
      formData.append('contestId', competitionId.toString())
      formData.append('channelNames', this.selectedChannelNames.join(','))
      formData.append('condition', this.getContestCondition(form))
      formData.append('answer', this.getContestConditionAnswer(form))
      formData.append('userId', userId)
    }

    return formData;
  }

  getDataForBot(form: FormGroup, competitionId: number){
    return {
      type: 'create-contest',
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
      media: form.get('media')?.value.name ? main_url + '/media/' + form.get('media')?.value.name : '',
      winnerCount: form.get('competitionWinnersCount')?.value,
      botid: localStorage.getItem('botid'),
      language: form.get('languageSelector')?.value,
      contestId: competitionId.toString(),
      channelNames: this.selectedChannelNames.join(','),
      condition: this.getContestCondition(form),
      answer: this.getContestConditionAnswer(form)
    }
  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      competitionName: ['contest', Validators.maxLength(500)],
      competitionDescription: ['contest description', Validators.maxLength(500)],
      media: ['', [this.fileValidatorService.fileValidator(['png', 'jpg', 'mp4'])]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      competitionStartTime: [this.currentTime, [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      competitionFinishTime: ['19:00', [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      competitionWinnersCount: ['1', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      languageSelector: ['ru'],
      selectedCondition: [''],
      selectedBaseCondition: [{ value: 'subscribe', disabled: true }],
      emailCondition: [true],
      phoneCondition: [false],
      selfCondition: [false],
      selfConditionTypes: ['text'],
      selfConditionName: [''],
      guessNumberCondition: ['exact'],
      guessNumber: ['']
    });
  }

}
