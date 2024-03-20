import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ChatTokenService} from "../../core/services/chat-token/chat-token.service";
import {ChannelsService} from "../../core/services/channels/channels.service";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";
import {forkJoin, Observable} from "rxjs";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-chat-selector-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './chat-selector-dialog.component.html',
  styleUrl: './chat-selector-dialog.component.scss'
})
export class ChatSelectorDialogComponent {
  private chatList: TelegramEntityInterface[] = [];

  selectedTelegramEntity = new Set<TelegramEntityInterface>();

  selectElementsExist: boolean = false;

  private tokenId = '';
  private tokenName = '';

  constructor(private telegram: TelegramService,
              private router: Router,
              private route: ActivatedRoute,
              private chatTokenService: ChatTokenService,
              public dialogRef: MatDialogRef<ChatSelectorDialogComponent>,
              private channelsService: ChannelsService,
              private adminsListService: AdminsListService) {
    this.goBack = this.goBack.bind(this);

    this.tokenId = localStorage.getItem('tokenId') || '';
    this.tokenName = localStorage.getItem('tokenName') || '';
  }

  getChannelsList(){
    return this.chatList;
  }

  navigateToSetupToken() {
    this.addTokenFromList().subscribe(() => {
      this.closeModal();
    })
  }

  selectTelegramEntity(entity: TelegramEntityInterface) {
    if(this.selectedTelegramEntity.has(entity)){
      console.log(this.selectedTelegramEntity)
      entity.selected = !entity.selected;
      this.selectedTelegramEntity.delete(entity);
    }else{
      console.log(this.selectedTelegramEntity)
      entity.selected = !entity.selected;
      this.selectedTelegramEntity.add(entity);
    }
  }

  checkSelectedElements(){
    console.log('check selected elements: ' + this.selectedTelegramEntity.size)
    console.log('check selected elements: ' + (this.selectedTelegramEntity.size === 0))
    return this.selectedTelegramEntity.size === 0;
  }

  addTokenFromList(){
    const chatIds = Array.from(this.selectedTelegramEntity).map((chat: TelegramEntityInterface) => parseInt(chat.id));

    return this.chatTokenService.addChatTokenToChannel(this.tokenId, chatIds, this.tokenName);
  }

  closeModal() {
    this.dialogRef.close();
  }

  private getChatIds(){
    this.adminsListService.getAdminsChatIds()
      .subscribe((chatIds: any) => {
        this.getMyChannels(chatIds);
      });
  }

  private getMyChannels(chatIds: string[]){
    this.channelsService.getChatGuardChannelsByChatIds(chatIds)
      .subscribe((response: any) => {
        this.chatList = response;
      });
  }

  goBack(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.getChatIds();
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }
}
