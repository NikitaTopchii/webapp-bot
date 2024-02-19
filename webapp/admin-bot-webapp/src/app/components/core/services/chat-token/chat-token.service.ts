import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {main_url} from "../../../shared/application-context";

@Injectable({
  providedIn: 'root'
})
export class ChatTokenService {

  constructor(private http: HttpClient, private router: Router) { }

  addChatToken(formData: FormData) {
    return this.http
      .post<any>(main_url + '/token/add-token', formData);
  }

  tokenExist(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/token/token-exist', { params: params });
  }

  addChatTokenToChannel(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/channels/set-token', { params: params });
  }

  isChatTokenExist(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/channels/is-token-exist', { params: params });
  }

  getTokens(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/token/get-tokens', { params: params });
  }

  deleteToken(formData: FormData) {
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/token/delete-token', { params: params });
  }
}
