import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserInterface} from "../../core/user.interface";
import {Admin} from "../../core/admin";
import {NgForOf, NgIf} from "@angular/common";
import {PermissionsInterface} from "../../core/permissions.interface";
import {Router} from "@angular/router";
import {EditAdminService} from "../../core/services/edit-admin/edit-admin.service";
import {TelegramService} from "../../core/services/telegram/telegram.service";

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
export class AdminListComponent implements OnInit, OnDestroy{



  private adminsList: Admin[] = [
    new Admin('213', 'Nikita', 'admin'),
    new Admin('213', 'Sasha', 'admin'),
    new Admin('213', 'Bodya', 'admin'),
    new Admin('213', 'Andrey', 'admin'),
    new Admin('213', 'Admin', 'admin'),
    new Admin('213', 'Denis', 'admin')
  ];

  private currentAdmin: string = '';

  constructor(private router: Router,
              private editAdminService: EditAdminService,
              private telegram: TelegramService) {
    this.goBack = this.goBack.bind(this);
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

  navigateToAddNewAdmin() {
    this.router.navigate(['/add-new-admin']);
  }

  navigateToEditPermissions(currentAdmin: Admin){
    this.editAdminService.getAdminSubject().next(currentAdmin);
    this.router.navigate(['/edit-admin']);
  }

  goBack(){
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }
}
