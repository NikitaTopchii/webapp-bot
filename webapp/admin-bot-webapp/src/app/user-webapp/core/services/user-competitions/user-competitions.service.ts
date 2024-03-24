import { Injectable } from '@angular/core';
import {
  BaseHttpClientService
} from "../../../../components/core/services/base-http-client-service/base-http-client.service";
import {HttpClient} from "@angular/common/http";
import {main_url} from "../../../../shared/application-context";

@Injectable({
  providedIn: 'root'
})
export class UserCompetitionsService extends BaseHttpClientService{

  constructor(private http: HttpClient) {
    super();
  }

  getUserCompetitionsId(userId: string){
    const formData = new FormData();

    formData.append('userid', userId);

    return this.http.get<any>(main_url + '/users-competition/user-competition-ids', { params: this.createHttpParams(formData)});
  }

  getActiveCompetitionsPreInfo(contestIds: string) {
    return this.http.get<any>(main_url + '/users-competition/user-active-competitions-pre-info', { params: this.createHttpParams(this.getFormDataForUserContests(contestIds))})
  }

  getActiveCompetitionsInfo(contestIds: string){
    return this.http.get<any>(main_url + '/users-competition/user-active-competitions-info', { params: this.createHttpParams(this.getFormDataForUserContests(contestIds))})
  }

  getFinishedCompetitionsInfo(contestIds: string){
    return this.http.get<any>(main_url + '/users-competition/user-finished-competitions-pre-info', { params: this.createHttpParams(this.getFormDataForUserContests(contestIds))})
  }

  getFinishedCompetitionsPreInfo(contestIds: string){
    return this.http.get<any>(main_url + '/users-competition/user-finished-competitions-info', { params: this.createHttpParams(this.getFormDataForUserContests(contestIds))})
  }

  getFormDataForUserContests(contestIds: string){
    const formData = new FormData();

    formData.append('contestIds', contestIds)

    return formData;
  }
}
