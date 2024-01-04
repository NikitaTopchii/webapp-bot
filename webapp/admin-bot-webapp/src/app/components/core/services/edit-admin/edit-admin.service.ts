import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Admin} from "../../admin";

@Injectable({
  providedIn: 'root'
})
export class EditAdminService {

  private adminSubject = new Subject<Admin>()
  private currentAdmin: Admin = new Admin('1', '2', 'admin');
  constructor() {
    this.adminSubject.subscribe((result) => {
      this.currentAdmin = result;
    })
  }

  public getAdmin(){
    return this.currentAdmin;
  }

  getAdminSubject(){
    return this.adminSubject;
  }
}
