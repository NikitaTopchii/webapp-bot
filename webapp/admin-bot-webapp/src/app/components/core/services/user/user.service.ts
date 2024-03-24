import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {main_url} from "../../../../shared/application-context"
import {BaseHttpClientService} from "../base-http-client-service/base-http-client.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpClientService{

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  getUser(userId: string) {
    const formData = new FormData();

    formData.append('userid', userId)

    return this.http
      .get<any>(main_url + '/users/user', { params: this.createHttpParams(formData) });
  }
}
