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
      .post<string>(main_url + '/token/add-token', formData);
  }

  addChatTokenToChannel(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/channels/set-token', { params: params });
  }
}
