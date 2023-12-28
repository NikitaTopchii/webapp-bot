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

  private creatorsIdList: number[] = [];

  private userIdsList: number[] = [];

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

  setCreatorsIdList(){
    const user_id = localStorage.getItem('user_id');

    if (user_id){
      const formData = new FormData();

      formData.append('user_id', user_id);

      this.adminsListService.getAdminsWithSubscription(formData).subscribe((response) => {
        const admins = response.results;

        admins.forEach((admin: any) => {
          this.creatorsIdList.push(admin.creators_id);
        });

        this.setUserIdsList();
      })
    }
  }

  setUserIdsList(){
    const formData = new FormData();

    formData.append('creators_ids', this.creatorsIdList.join(','));

    this.adminsListService.getAdmins(formData).subscribe((response) => {
      const admins = response.results;

      admins.forEach((admin: any) => {
        this.userIdsList.push(admin.userid);

        const permissions = JSON.parse(admin.rights);

        const newAdmin = new Admin(admin.userid, 'admin', 'admin');

        newAdmin.setPermissions(
          {
            selectAdminFromList: permissions.show_admins,
            actionWithCompetition: permissions.create_competition,
            editPermission: permissions.edit_permissions
          }
        )

        this.adminsList.add(newAdmin);
      });

      this.setAdmins();
    })
  }

  setAdmins(){
    const formData = new FormData();

    formData.append('user_ids', this.userIdsList.join(','));

    this.adminsListService.getUserAdmins(formData).subscribe((response) => {
      const admins = response.results;

      admins.forEach((admin: any) => {
        this.setAdminName(admin.userid, admin.username);
      });
    })
  }
  setAdminName(adminId: any, adminName: string){
    const existingAdmin = Array.from(this.adminsList).find(admin => admin.id === adminId);

    if(existingAdmin){
      this.adminsList.delete(existingAdmin);

      const newAdmin = new Admin(existingAdmin.id, adminName, 'admin');

      newAdmin.setPermissions(existingAdmin.permissions);

      this.adminsList.add(newAdmin);
    }
  }

  ngOnInit(): void {
    this.setCreatorsIdList();

    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }

  ngOnDestroy(): void {
    this.userIdsList = [];
    this.creatorsIdList = [];
    this.telegram.BackButton.offClick(this.goBack);
  }
}
