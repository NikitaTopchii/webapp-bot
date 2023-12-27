import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserInterface} from "../../core/user.interface";
import {Admin} from "../../core/admin";
import {NgForOf, NgIf} from "@angular/common";
import {PermissionsInterface} from "../../core/permissions.interface";
import {Router} from "@angular/router";
import {EditAdminService} from "../../core/services/edit-admin/edit-admin.service";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";

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



  private adminsList = new Set<Admin>();

  private currentAdmin: string = '';

  constructor(private router: Router,
              private editAdminService: EditAdminService,
              private telegram: TelegramService,
              private adminsListService: AdminsListService) {
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

  setAdmins(){
    const creators_id = localStorage.getItem('creators_id');

    if (creators_id){
      const formData = new FormData();

      formData.append('creators_id', creators_id);

      this.adminsListService.getAdmins(formData).subscribe((response) => {
        const admins = response.results;

        admins.forEach((admin: any) => {
          this.adminsList.add(new Admin(admin.userid, admin.name, 'admin'))
        });
      })
    }
  }

  ngOnInit(): void {
    this.setAdmins();

    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }
}
