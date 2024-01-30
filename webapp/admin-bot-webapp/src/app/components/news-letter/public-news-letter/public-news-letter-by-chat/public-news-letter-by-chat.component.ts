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
import {main_url} from "../../../shared/application-context";

@Component({
  selector: 'app-public-news-letter-by-chat',
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
              private dateTimeValidationService: DateTimeValidatorService,
              private fileValidatorService: FileValidatorService) {

    this.goBack = this.goBack.bind(this);
    this.sendData = this.sendData.bind(this);

    console.log(this.currentTime)
    this.form = this.getCreateCompetitionForm();
  }

  pushNewsLetter(form: FormGroup) {
    this.sendNewsLetterDataToBot(form);
  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      newsLetterMessage: ['', Validators.required],
      startDate: ['', Validators.required],
      competitionStartTime: [this.currentTime, Validators.required],
      inlineLink: [''],
      media: ['', [this.fileValidatorService.fileValidator(['png', 'jpeg', 'jpg', 'mp4'])]],
    });
  }

  getSelectedChannels(){
    return this.selectedChannels;
  }

  sendData(data: any){
    //this.createCompetitionService.createPublicNewsLetter(data);
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

  sendNewsLetterDataToBot(form: FormGroup){
    this.sendData(this.getCompetitionData(form));
  }

  getCompetitionData(form: FormGroup) {
    return {
      type: 'public-news-letter',
      contestDescription: form.get('newsLetterMessage')?.value,
      competitionStartDate: this.dateTimeValidationService.checkDateValidation(
        form.get('startDate')?.value,
        form.get('competitionStartTime')?.value
      ),
      inlineLink: form.get('inlineLink')?.value,
      chatId: this.selectedChannelIds?.join(','),
      urls: form.get('media')?.value.name ? main_url + '/media/' + form.get('media')?.value.name : '',
    }
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
}
