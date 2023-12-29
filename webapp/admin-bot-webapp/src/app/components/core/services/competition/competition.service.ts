import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {main_url} from "../../../shared/application-context";
import {TokenGenerateService} from "../token/token-generate.service";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  constructor(private http: HttpClient, private router: Router) {
  }

  createCompetition(formData: FormData) {
    return this.http
      .post<string>(main_url + '/competitions/create', formData)
      .subscribe((response) => {

        console.log(response)
      });
  }

  getCompetition(formData: FormData) {
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http.get<any>(main_url+'/competitions/competition', { params: params });
  }

  checkSubscription(formData: FormData){
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http.get<any>(main_url+'/competitions/subscribe-verification', { params: params });
  }

  publishCompetition(formData: FormData) {
    return this.http
      .post<string>(main_url + '/competitions/publish', formData)
      .subscribe((response) => {

        console.log(response)
      });
  }
}
