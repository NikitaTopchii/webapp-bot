import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {main_url} from "../../../../shared/application-context";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminsListService {

  constructor(private http: HttpClient) {
  }

  getAdminsWithSubscription(formData: FormData) {
    return this.http
      .get<any>(main_url + '/admins/all-subscription', { params: this.createHttpParams(formData) });
  }

  getAdminsChatIds(){
    const formData = new FormData();

    formData.append('user_id', localStorage.getItem('user_id') || '');

    return this.http
      .get<any>(main_url + '/admins/all-subscription', { params: this.createHttpParams(formData) })
      .pipe(map((response: any) => response.results.map((admin: any) => admin.chatid)));
  }

  getHiredAdmins(formData: FormData){
    return this.http
      .get<any>(main_url + '/admins/hired-admins', { params: this.createHttpParams(formData) });
  }

  savePermissions(formData: FormData){
    return this.http
      .post<any>(main_url + '/admins/save-admin-permissions', formData);
  }

  //'/admins/get-chats'
  getHiredAdminChats(formData: FormData){
    return this.http
      .get<any>(main_url + '/admins/get-chats', { params: this.createHttpParams(formData) });
  }

  getUser(formData: FormData){
    return this.http
      .get<any>(main_url + '/users/check', { params: this.createHttpParams(formData) });
  }

  authUser(formData: FormData) {
    return this.http
      .post<any>(main_url + '/users/auth', formData);
  }

  deleteAdmin(formData: FormData) {
    return this.http
      .post<any>(main_url + '/admins/delete', formData);
  }

  addChatForHiredAdmin(formData: FormData) {
    return this.http
      .post<any>(main_url + '/admins/add-chat', formData);
  }

  private createHttpParams(formData: FormData): HttpParams {
    let params = new HttpParams();
    formData.forEach((value, key) => {
      params = params.append(key, value as string);
    });
    return params;
  }
}
