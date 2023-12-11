import { Component } from '@angular/core';
import {User} from "../core/user";
import {Admin} from "../core/admin";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss'
})
export class AdminListComponent {

  private adminsList: User[] = [
    new Admin('213', 'Nikita', 'admin'),
    new Admin('213', 'Sasha', 'admin'),
    new Admin('213', 'Bodya', 'admin'),
    new Admin('213', 'Andrey', 'admin'),
    new Admin('213', 'Admin', 'admin'),
    new Admin('213', 'Denis', 'admin')
  ];

  private currentAdmin: string = '';

  constructor() {
  }

  public showPermissions(adminName: string){
    if(this.currentAdmin == adminName){
      this.currentAdmin = '';
    }else{
      this.currentAdmin = adminName;
    }
  }

  public getCurrentAdmin(){
    return this.currentAdmin;
  }

  public getAdminsList(){
    return this.adminsList;
  }
}
