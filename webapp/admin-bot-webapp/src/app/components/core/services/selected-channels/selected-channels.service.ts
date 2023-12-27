import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {TelegramEntityInterface} from "../../telegram-entity/telegram-entity.interface";

@Injectable({
  providedIn: 'root'
})
export class SelectedChannelsService {

  private selectedChannels = new BehaviorSubject<Set<TelegramEntityInterface>>(new Set());
  constructor() { }
  getSelectedChannels(){
    return this.selectedChannels.asObservable();
  }

  setSelectedChannels(channels: Set<TelegramEntityInterface>) {
    this.selectedChannels.next(channels);
  }
}
