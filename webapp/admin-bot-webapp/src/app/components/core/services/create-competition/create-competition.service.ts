import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {main_url} from "../../../shared/application-context";

@Injectable({
  providedIn: 'root'
})
export class CreateCompetitionService {
  constructor(private http: HttpClient, private router: Router) {
  }

  createCompetition(formData: FormData) {
    return this.http
      .post<string>(main_url + '/competitions/create', formData)
      .subscribe((response) => {

        console.log(response)
      });
  }
}
