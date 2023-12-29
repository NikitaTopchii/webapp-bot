import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

interface TgButton{
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(f: Function): void;
  offClick(f: Function): void;
}

interface TgInitData{
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  query_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  window;
  tg;
  constructor(@Inject(DOCUMENT) private _document: Document) {
    this.window = this._document.defaultView;
    // @ts-ignore
    this.tg = this.window.Telegram.WebApp;
  }

  get MainButton(): TgButton{
    return this.tg.MainButton;
  }

  get BackButton(): TgButton{
    return this.tg.BackButton;
  }

  get InitData(): any{
    return this.tg.initData;
  }

  setData(data: any){
    this.tg.sendData(JSON.stringify(data));
  }

  get ParsedInitData(){
    return JSON.parse('{"' + this.InitData.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
  }

  get UserData(){
    return JSON.parse(this.ParsedInitData.user);
  }

  ready(){
    this.tg.ready();
  }
}
