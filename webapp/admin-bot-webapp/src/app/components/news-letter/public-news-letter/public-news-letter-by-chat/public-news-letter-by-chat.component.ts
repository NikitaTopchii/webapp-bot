import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TelegramEntityInterface} from "../../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {CompetitionService} from "../../../core/services/competition/competition.service";
import {SelectedChannelsService} from "../../../core/services/selected-channels/selected-channels.service";
import {TokenGenerateService} from "../../../core/services/token/token-generate.service";
import {DateTimeValidatorService} from "../../../core/services/validators/date-time/date-time-validator.service";
import {FileValidatorService} from "../../../core/services/validators/file/file-validator.service";
import {main_url} from "../../../../shared/application-context";
import {TextValidatorService} from "../../../core/services/validators/text-validator/text-validator.service";

type ConditionType = 'contestMedia' | 'contestDate' | 'contestTime' | 'contestWinnersCount' | 'contestLanguage' | 'jointContest' | 'contestCondition' | 'currentCompetitionType';

type VisibilityState = {
  [key in ConditionType]: boolean;
};

type CompetitionType = {
  jointContest: boolean;
  amountOfAdmins: number;
}
@Component({
  selector: 'app-public-news-letter-by-chat',
  templateUrl: './public-news-letter-by-chat.component.html',
  styleUrl: './public-news-letter-by-chat.component.scss'
})
export class PublicNewsLetterByChatComponent implements OnInit, OnDestroy{
  form: FormGroup;
  minDate: Date = new Date(Date.now());
  private selectedChannels: Set<TelegramEntityInterface> = new Set<TelegramEntityInterface>();
  private selectedChannelIds: string[] = [];
  private selectedChannelNames: string[] = [];

  failedDateValidation = false;
  failedTimeValidation = false;
  wrong = false;
  currentTime: string = this.dateTimeValidationService.getCurrentTime();
  setContestMedia: boolean = true;

  public visibilityState: VisibilityState = {
    contestMedia: false,
    contestDate: false,
    contestTime: false,
    contestWinnersCount: false,
    contestLanguage: false,
    jointContest: false,
    contestCondition: false,
    currentCompetitionType: false
  }

  constructor(private readonly fb: FormBuilder,
              private telegram: TelegramService,
              private router: Router,
              private createCompetitionService: CompetitionService,
              private selectedChannelsService: SelectedChannelsService,
              private dateTimeValidationService: DateTimeValidatorService,
              private fileValidatorService: FileValidatorService,
              private generateTokenService: TokenGenerateService,
              private textValidatorService: TextValidatorService,
              ) {

    this.goBack = this.goBack.bind(this);
    this.sendData = this.sendData.bind(this);

    this.form = this.getCreateCompetitionForm();
  }

  pushNewsLetter(form: FormGroup) {
    this.sendNewsLetterDataToBot(form);
  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      newsLetterMessage: ['Your message', [Validators.maxLength(1024)]],
      startDate: ['', Validators.required],
      competitionStartTime: [this.currentTime, [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      inlineLink: ['', [this.textValidatorService.urlValidator()]],
      media: ['', [this.fileValidatorService.fileValidator(['png', 'jpg'])]],
    });
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

  getSelectedChannels(){
    return this.selectedChannels;
  }

  sendData(data: any){
    this.createCompetitionService.createPublicNewsLetter(data);
    //this.telegram.sendData(data);
  }

  goBack(){
    this.router.navigate(['/main']);
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

  sendNewsLetterDataToBot(form: FormGroup){
    this.sendData(this.getCompetitionData(form));
  }

  getCompetitionData(form: FormGroup) {
    const formData = new FormData();

    formData.append('post_description', form.get('newsLetterMessage')?.value)
    formData.append('post_start_date', this.dateTimeValidationService.checkDateValidation(
      form.get('startDate')?.value,
      form.get('competitionStartTime')?.value
    ))
    formData.append('inline_link', form.get('inlineLink')?.value)
    formData.append('chatId', this.selectedChannelIds?.join(','))
    formData.append('media', form.get('media')?.value.name ? main_url + '/media/' + form.get('media')?.value.name : '')
    formData.append('bot_id', localStorage.getItem('botid') || '');
    formData.append('user_id', localStorage.getItem('user_id') || '');

    return formData;
    // return {
    //   type: 'public-news-letter',
    //   contestDescription: form.get('newsLetterMessage')?.value,
    //   competitionStartDate: this.dateTimeValidationService.checkDateValidation(
    //     form.get('startDate')?.value,
    //     form.get('competitionStartTime')?.value
    //   ),
    //   inlineLink: form.get('inlineLink')?.value,
    //   language: form.get('languageSelector')?.value,
    //   chatId: this.selectedChannelIds?.join(','),
    //   // urls: form.get('imagesLinks')?.value,
    //   media: ['', [this.fileValidatorService.fileValidator(['png', 'jpg'])]],
    //   urls: form.get('media')?.value.name ? main_url + '/media/' + form.get('media')?.value.name : '',
    // }
  }
}

