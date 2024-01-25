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

  failedDateValidation = false;
  currentTime: string = this.dateTimeValidationService.getCurrentTime();

  //buttons
  setContestName: boolean = true;
  setContestDescription: boolean = true;
  setContestMedia: boolean = true;
  setContestData: boolean = true;
  setContestTime: boolean = true;
  setContestLanguage: boolean = true;
  setContestWinnersCount: boolean = true;
  setContestCondition: boolean = true;
  conditionTypes: boolean = false;
  setSelfConditionBuilder: boolean = true;
  setGuessNumberCondition: boolean = true;

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

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      competitionName: ['contest', Validators.required],
      competitionDescription: ['contest description'],
      media: ['', [this.fileValidatorService.fileValidator(['png', 'jpg'])]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      competitionStartTime: [this.currentTime, Validators.required],
      competitionFinishTime: ['19:00', Validators.required],
      competitionWinnersCount: ['1', Validators.required],
      languageSelector: ['en'],
      conditionTypes: ['email'],
      conditionSelector: ['subscribe'],
      selfConditionTypes: ['text'],
      selfConditionName: [''],
      guessNumberCondition: ['exact'],
      guessNumber: ['']
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    this.form.patchValue({ media: file });
  }

  getFieldValue(form: FormGroup, field: string) {
    return form.get(field)?.value;
  }

  getContestCondition(form: FormGroup) {
    const conditionSelector = this.getFieldValue(form, 'conditionSelector');

    switch (conditionSelector) {
      case 'subscribe':
        return 'subscribe';
      case 'condition':
        const conditionType = this.getFieldValue(form, 'conditionTypes');
        switch (conditionType) {
          case 'email':
            return 'email';
          case 'number':
            return 'number';
          default:
            return 'self,' + this.getFieldValue(form, 'selfConditionTypes');
        }
      default:
        return this.getFieldValue(form, 'guessNumberCondition');
    }
  }

  getContestConditionAnswer(form: FormGroup) {
    const conditionSelector = this.getFieldValue(form, 'conditionSelector');
    const conditionType = this.getFieldValue(form, 'conditionTypes');

    if (conditionSelector === 'condition' && conditionType === 'self') {
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
  }

  sendCompetitionDataToBot(form: FormGroup, competitionId: number){
    this.sendData(this.getCompetitionData(form, competitionId));
  }

  getCompetitionData(form: FormGroup, competitionId: number){
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
      media: form.get('media')?.value,
      winnerCount: form.get('competitionWinnersCount')?.value,
      botid: localStorage.getItem('botid'),
      language: form.get('languageSelector')?.value,
      contestId: competitionId.toString(),
      channelNames: this.selectedChannelNames.join(','),
      condition: this.getContestCondition(form),
      answer: this.getContestConditionAnswer(form)
    }
  }

  showContestNameInput(){
    this.setContestName = !this.setContestName;
  }

  showContestDescriptionInput(){
    this.setContestDescription = !this.setContestDescription;
  }

  showContestMediaInput(){
    this.setContestMedia = !this.setContestMedia;
  }

  showContestDataInput(){
    this.setContestData = !this.setContestData;
  }

  showContestTimeInput(){
    this.setContestTime = !this.setContestTime;
  }

  showContestWinnersCount(){
    this.setContestWinnersCount = !this.setContestWinnersCount;
  }

  showContestLanguageInput(){
    this.setContestLanguage = !this.setContestLanguage;
  }

  showContestConditionInput(){
    this.hideConditionTypes();
    this.hideSelfConditionBuilder();
    this.hideGuessNumberCondition();
    this.setContestCondition = !this.setContestCondition;
  }

  showConditionTypes() {
    this.hideGuessNumberCondition();
    this.conditionTypes = !this.conditionTypes;
  }

  hideConditionTypes(){
    this.conditionTypes = false;
    this.hideGuessNumberCondition();
  }

  showSelfConditionBuilder() {
    this.setSelfConditionBuilder = !this.setSelfConditionBuilder;
  }

  hideSelfConditionBuilder() {
    this.setSelfConditionBuilder = true;
  }

  showGuessNumberCondition() {
    this.hideSelfConditionBuilder();
    this.hideConditionTypes();
    this.setGuessNumberCondition = !this.setGuessNumberCondition;
  }

  hideGuessNumberCondition(){
    this.setGuessNumberCondition = true;
  }
}
