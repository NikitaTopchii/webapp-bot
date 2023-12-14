import { Component } from '@angular/core';
import {UserInterface} from "../core/user.interface";
import {Admin} from "../core/admin";
import {NgForOf, NgIf} from "@angular/common";
import {PermissionsInterface} from "../core/permissions.interface";

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

  private admin = new Admin('213', 'Nikita', 'admin');

  private adminsList: Admin[] = [
    this.admin,
    new Admin('213', 'Sasha', 'admin'),
    new Admin('213', 'Bodya', 'admin'),
    new Admin('213', 'Andrey', 'admin'),
    new Admin('213', 'Admin', 'admin'),
    new Admin('213', 'Denis', 'admin')
  ];

  private permissions: PermissionsInterface = {
    selectAdminFromList: true,
    actionWithCompetition: false,
    actionWithStatistic: true,
    permissionToTokenAndPrices: false,
    actionWithChatSecurity: false,
    editPermission: false
  };

  private currentAdmin: string = '';

  constructor() {
    this.admin.setPermissions(this.permissions);
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
