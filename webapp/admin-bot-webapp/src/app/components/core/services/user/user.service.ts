import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {main_url} from "../../../shared/application-context"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getUser(formData: FormData) {
    let params = new HttpParams();

    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });

    return this.http
      .get<any>(main_url + '/users/auth', { params: params });
  }
}
