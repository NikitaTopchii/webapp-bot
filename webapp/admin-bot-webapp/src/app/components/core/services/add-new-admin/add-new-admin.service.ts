import { Injectable } from '@angular/core';
import {HttpService} from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class AddNewAdminService {

  private url: string = '/add-new-admin';

  constructor(private httpService: HttpService) { }

  public addNewAdmin(formData: FormData){
    this.httpService.post(formData, this.url).subscribe();
  }
}
