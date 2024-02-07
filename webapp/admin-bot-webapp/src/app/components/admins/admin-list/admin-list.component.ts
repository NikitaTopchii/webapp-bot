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

  ngOnInit(): void {
    this.setCreatorsIdList();

    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
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

  navigateToEditPermissions(currentAdmin: Admin){
    this.editAdminService.getAdminSubject().next(currentAdmin);
    this.router.navigate(['admins/edit-admin-permissions']);
  }

  goBack(){
    this.router.navigate(['']);
  }

  setCreatorsIdList(){
    const user_id = localStorage.getItem('user_id');

    if (user_id){
      const formData = new FormData();

      formData.append('owner_id', user_id);

      this.adminsListService.getHiredAdmins(formData).subscribe((response) => {
        const admins = response.results;

        admins.forEach((admin: any) => {

          const permissions = JSON.parse(admin.rights);

          const newAdmin = new Admin(admin.userid, admin.note || 'unnamed admin', 'hired');

          newAdmin.setPermissions(
            {
              selectAdminFromList: permissions.show_admins,
              actionWithCompetition: permissions.create_competition,
              editPermission: permissions.edit_permissions
            }
          )

          this.adminsList.add(newAdmin);
        });
      })
    }
  }

  deleteAdmin(admin: Admin) {
    const formData = new FormData();

    formData.append('admin_id', admin.id);

    this.adminsListService.deleteAdmin(formData).subscribe(() => {
      this.adminsList.delete(admin);
    });
  }
}
