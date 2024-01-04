import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {main_url} from "../../../shared/application-context";

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  private channels: any;

  constructor(private http: HttpClient) {
  }

  getChannels(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/channels/my', { params: params });
  }
}
