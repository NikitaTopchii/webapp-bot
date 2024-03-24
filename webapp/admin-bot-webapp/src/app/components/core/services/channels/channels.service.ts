import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {main_url} from "../../../../shared/application-context";
import {BaseHttpClientService} from "../base-http-client-service/base-http-client.service";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChannelsService extends BaseHttpClientService{
  private channels: any;

  constructor(private http: HttpClient) {
    super()
  }

  getChannels(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/channels/my', { params: params });
  }

  getChannelsByChatIds(chatIds: string[]){

    const formData = new FormData();

    formData.append('chat_ids', chatIds.join(','));
    formData.append('botid', localStorage.getItem('botid') || '');

    return this.http
      .get<any>(main_url + '/channels/my', { params: this.createHttpParams(formData) })
      .pipe(map((response:any) => {
        return response.results.map((channel: any) => {
          return {
            id: channel.chatid,
            name: channel.name,
            selected: false
          }
        })
      }));
  }

  getChatGuardChannelsByChatIds(chatIds: string[]){

    const formData = new FormData();
//'6585799932'
    formData.append('chat_ids', chatIds.join(','));
    formData.append('botid', localStorage.getItem('botid') || '');

    return this.http
      .get<any>(main_url + '/channels/my', { params: this.createHttpParams(formData) })
      .pipe(map((response:any) => {
        return response.results.map((channel: any) => {
          return {
            id: channel.chatid,
            name: channel.name,
            selected: false
          }
        })
      }));
  }

  getChannelsByChatId(chatId: string){

    const formData = new FormData();

    formData.append('chat_ids', chatId);
    formData.append('botid', localStorage.getItem('botid') || '');

    return this.http
      .get<any>(main_url + '/channels/my', { params: this.createHttpParams(formData) })
      .pipe(map((response:any) => {
        return response.results.map((channel: any) => {
          return {
            chatSecurityStatus: channel.chatguard === 1,
            chatStopWordStatus: channel.stop_words === 1,
            chatCaptchaStatus: channel.captcha === 1,
            chatCommandStatus: channel.commands === 1,
            chatGamificationStatus: channel.gemification === 1
          }
        })[0]
      }));
  }
}
