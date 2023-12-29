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
@Component({
  selector: 'app-competition-creator',
  templateUrl: './competition-creator.component.html',
  styleUrl: './competition-creator.component.scss'
})
export class CompetitionCreatorComponent implements OnInit, OnDestroy{
  form: FormGroup;
  private selectedChannels: Set<TelegramEntityInterface> = new Set<TelegramEntityInterface>();
  private selectedChannelIds: string[] = [];

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
      })
    })
  }

  createCompetition(form: FormGroup) {
    const competitionId = this.generateTokenService.generateSHA256Token();

    this.sendData;

    this.setCompetitionDrafts(form, competitionId);
    this.publishCompetitionInChannels(form, competitionId);
  }

  setCompetitionDrafts(form: FormGroup, competitionId: number){
    const formData = new FormData();

    const competitionName = form.get('competitionName')?.value;
    const competitionDescription = form.get('competitionDescription')?.value;

    formData.append('competitionName', competitionName);
    formData.append('competitionDescription', competitionDescription);
    formData.append('channels', this.selectedChannelIds.join(','));
    formData.append('conditions', 'subscribe');
    formData.append('contests_id', competitionId.toString());

    this.createCompetitionService.createCompetition(formData);
  }

  publishCompetitionInChannels(form: FormGroup, competitionId: number){
    const formData = new FormData();

    const finishTime = '2023-12-30 06:45:42.000000';

    formData.append('contest_id', competitionId.toString());
    formData.append('chatid', this.selectedChannelIds[0])
    formData.append('channels', this.selectedChannelIds.join(','));
    formData.append('finishTime', finishTime);
    formData.append('conditions', 'subscribe');

    this.createCompetitionService.publishCompetition(formData);
  }
}
