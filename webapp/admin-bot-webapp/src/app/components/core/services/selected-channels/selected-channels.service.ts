import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {TelegramEntityInterface} from "../../telegram-entity/telegram-entity.interface";
import {Chat} from "../../chat";

@Injectable({
  providedIn: 'root'
})
export class SelectedChannelsService {

  private selectedChannels = new BehaviorSubject<Set<TelegramEntityInterface>>(new Set());

  private selectedChat = new BehaviorSubject<TelegramEntityInterface>({
    id: '',
    name: '',
    selected: false
  });

  private selectedChatForNewsLetter = new Subject<TelegramEntityInterface>();
  constructor() { }
  getSelectedChannels(){
    return this.selectedChannels.asObservable();
  }

  getSelectedChat(){
    return this.selectedChat.asObservable();
  }

  getSelectedChatForNewLetter(){
    return this.selectedChatForNewsLetter.asObservable();
  }

  setSelectedChannels(channels: Set<TelegramEntityInterface>) {
    this.selectedChannels.next(channels);
  }

  setSelectedChat(chat: TelegramEntityInterface){
    this.selectedChat.next(chat);
  }

  setSelectedChatForNewsLetter(chat: TelegramEntityInterface){
    this.selectedChatForNewsLetter.next(chat);
  }
}
