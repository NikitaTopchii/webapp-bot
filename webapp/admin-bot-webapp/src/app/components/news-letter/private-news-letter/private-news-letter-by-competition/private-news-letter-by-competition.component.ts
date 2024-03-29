import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TelegramService} from "../../../core/services/telegram/telegram.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CompetitionService} from "../../../core/services/competition/competition.service";
import {DateTimeValidatorService} from "../../../core/services/validators/date-time/date-time-validator.service";
import {ActiveCompetitionInterface} from "../../../core/active-competition.interface";
import {main_url} from "../../../shared/application-context";
import {FileValidatorService} from "../../../core/services/validators/file/file-validator.service";

@Component({
  selector: 'app-private-news-letter-by-competition',
  templateUrl: './private-news-letter-by-competition.component.html',
  styleUrl: './private-news-letter-by-competition.component.scss'
})
export class PrivateNewsLetterByCompetitionComponent implements OnInit, OnDestroy{
  form: FormGroup;
  minDate: Date = new Date(Date.now());

  failedDateValidation = false;

  contestId: string = '';

  currentTime: string = this.dateTimeValidationService.getCurrentTime();

  constructor(private readonly fb: FormBuilder,
              private telegram: TelegramService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private competitionService: CompetitionService,
              private dateTimeValidationService: DateTimeValidatorService,
              private fileValidatorService: FileValidatorService) {

    this.goBack = this.goBack.bind(this);

    this.form = this.getCreateCompetitionForm();
  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      newsLetterMessage: ['Your message', [Validators.maxLength(700)]],
      startDate: ['', Validators.required],
      competitionStartTime: [this.currentTime, [Validators.required, Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)]],
      languageSelector: ['ru'],
      media: ['', [this.fileValidatorService.fileValidator(['png', 'jpeg', 'jpg', 'mp4'])]]
    });
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

    this.competitionService.uploadMedia(formData);
  }

  sendCompetitionDataToBot(form: FormGroup){
    this.sendData(this.getNewsLetterData(form));
  }

  getNewsLetterData(form: FormGroup){
    return {
      type: 'private-news-letter',
      contestDescription: form.get('newsLetterMessage')?.value,
      competitionStartDate: this.dateTimeValidationService.checkDateValidation(
        form.get('startDate')?.value,
        form.get('competitionStartTime')?.value
      ),
      language: form.get('languageSelector')?.value,
      contestId: this.contestId,
      urls: form.get('media')?.value.name ? main_url + '/media/' + form.get('media')?.value.name : '',
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

  public privateNews!: boolean;

  ngOnInit(): void {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);

    this.activatedRoute.paramMap.subscribe(params => {
      this.contestId = params.get('id') || '';
    });
  }
}
