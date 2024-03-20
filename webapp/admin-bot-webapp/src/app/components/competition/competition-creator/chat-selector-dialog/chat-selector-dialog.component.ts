import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {TelegramEntityInterface} from "../../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../../core/services/telegram/telegram.service";
import {ChatTokenService} from "../../../core/services/chat-token/chat-token.service";
import {ChannelsService} from "../../../core/services/channels/channels.service";
import {AdminsListService} from "../../../core/services/admins/admins-list.service";
import {SelectedChannelsService} from "../../../core/services/selected-channels/selected-channels.service";

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
export class ContestChatSelectorDialogComponent {
  private chatList: TelegramEntityInterface[] = [];

  selectedTelegramEntity = new Set<TelegramEntityInterface>();

  selectElementsExist: boolean = false;

  constructor(
              private selectedChannelsService: SelectedChannelsService,
              public dialogRef: MatDialogRef<ContestChatSelectorDialogComponent>,
              private channelsService: ChannelsService,
              private adminsListService: AdminsListService) {
  }

  getChannelsList(){
    return this.chatList;
  }

  navToCreateCompetition() {
    this.getSelectedChats();

    this.closeModal();
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

  getSelectedChats(){
    this.selectedChannelsService.setSelectedChannels(this.selectedTelegramEntity);
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

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.getChatIds();
  }
}
