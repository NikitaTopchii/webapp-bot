import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {CompetitionService} from "../../core/services/competition/competition.service";
import {NgForOf} from "@angular/common";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TokenGenerateService} from "../../core/services/token/token-generate.service";
@Component({
  selector: 'app-competition-creator',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './competition-creator.component.html',
  styleUrl: './competition-creator.component.scss'
})
export class CompetitionCreatorComponent implements OnInit, OnDestroy{
  form: FormGroup;
  private selectedChannels: Set<TelegramEntityInterface> = new Set<TelegramEntityInterface>();
  private competitionToken: string = '';

  constructor(private readonly fb: FormBuilder,
              private telegram: TelegramService,
              private router: Router,
              private createCompetitionService: CompetitionService,
              private selectedChannelsService: SelectedChannelsService,
              private tokenGenerateService: TokenGenerateService) {

    this.goBack = this.goBack.bind(this);

    this.form = this.getCreateCompetitionForm();
  }

  private getCreateCompetitionForm(): FormGroup {
    return this.fb.group({
      competitionName: ['', Validators.required],
      competitionDescription: ['']
    });
  }

  getSelectedChannels(){
    return this.selectedChannels;
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
    })
  }

  createCompetition(form: FormGroup) {
    const formData = new FormData();

    const competitionName = form.get('competitionName')?.value;
    const competitionDescription = form.get('competitionDescription')?.value;

    formData.append('competitionName', competitionName);
    formData.append('competitionDescription', competitionDescription);
    formData.append('channels', 'channels');
    formData.append('conditions', 'subscribe');
    formData.append('contests_id', '2410');

    this.createCompetitionService.createCompetition(formData);
  }

  generateCompetitionToken(){
    this.competitionToken = this.tokenGenerateService.generateSHA256Token();
  }

  getCompetitionToken(){
    return this.competitionToken;
  }
}
