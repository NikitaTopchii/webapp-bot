import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {ChannelsService} from "../../core/services/channels/channels.service";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ChatTokenService} from "../../core/services/chat-token/chat-token.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-token-selector',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    ReactiveFormsModule
  ],
  templateUrl: './token-selector.component.html',
  styleUrl: './token-selector.component.scss'
})
export class TokenSelectorComponent {
  private channelsList: TelegramEntityInterface[] = [];

  selectedTelegramEntity = new Set<TelegramEntityInterface>();

  private selectedChannels: Set<TelegramEntityInterface> = new Set<TelegramEntityInterface>();
  private selectedChannelIds: string[] = [];
  private selectedChannelNames: string[] = [];

  selectElementsExist: boolean = false;

  private chatIdsList: number[] = [];
  form: any;

  constructor(private readonly fb: FormBuilder,
              private telegram: TelegramService,
              private router: Router,
              private chatTokenService: ChatTokenService,
              private channelsService: ChannelsService,
              private selectedChannelsService: SelectedChannelsService,
              private adminsListService: AdminsListService) {
    this.form = this.getTokenForm();
    this.goBack = this.goBack.bind(this);
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

  getTokenForm(){
    return this.fb.group({
      tokenName: ['tokenName', Validators.maxLength(32)],
    });
  }

  getChannelsList(){
    return this.channelsList;
  }

  navigateToSetupToken() {
    this.selectedChannelsService.setSelectedChannels(this.selectedTelegramEntity);

    this.router.navigate(['/setup-token'])
  }

  selectTelegramEntity(entity: TelegramEntityInterface) {
    if(entity.selected){
      entity.selected = !entity.selected;
      this.selectedTelegramEntity.delete(entity);
      this.checkSelectedElements();
    }else{
      entity.selected = !entity.selected;
      this.selectedTelegramEntity.add(entity);
      this.checkSelectedElements();
    }
  }

  checkSelectedElements(){
    for (const element of this.selectedTelegramEntity) {
      if (element.selected) {
        this.selectElementsExist = true;
        break;
      } else {
        this.selectElementsExist = false;
      }
    }
  }

  goBack(){
    this.router.navigate(['']);
  }

  addToken(form: FormGroup) {
    const formData = new FormData();

    formData.append('name', form.get('tokenName')?.value);
    formData.append('owner', localStorage.getItem('user_id') || '');
    formData.append('chats', this.selectedChannelIds.join(','));

    this.chatTokenService.addChatToken(formData).subscribe(() => {
      this.selectedChannelIds.forEach((chatid) => {
        const formData = new FormData();

        formData.append('token', form.get('tokenName')?.value);
        formData.append('chatid', chatid);

        this.chatTokenService.addChatTokenToChannel(formData).subscribe(() => {
          console.log('added')
        })
      })
    })
  }
}
