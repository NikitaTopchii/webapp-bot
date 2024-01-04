import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PermissionsComponent} from "../permissions/permissions.component";
import {Admin} from "../../core/admin";
import {PermissionsService} from "../../core/services/permissions/permissions.service";
import {EditAdminService} from "../../core/services/edit-admin/edit-admin.service";
import {Router, RouterLink} from "@angular/router";
import {TelegramService} from "../../core/services/telegram/telegram.service";

@Component({
  selector: 'app-edit-permissions-page',
  standalone: true,
  imports: [
    PermissionsComponent,
    RouterLink
  ],
  templateUrl: './edit-permissions-page.component.html',
  styleUrl: './edit-permissions-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPermissionsPageComponent implements OnInit, OnDestroy{

  private readonly admin: Admin;
  private permissions: any;

  constructor(private permissionsService: PermissionsService,
              private editAdminService: EditAdminService,
              private telegram: TelegramService,
              private router: Router) {

    this.admin = this.editAdminService.getAdmin();
    this.permissionsService.setCurrentAdminPermissions(this.admin?.permissions);
    this.goBack = this.goBack.bind(this);
  }
  getAdmin(){
    return this.admin;
  }

  savePermissions(){
    this.permissions = this.permissionsService.getCurrentAdminPermissions();
    this.admin.setPermissions(this.permissions);
    this.router.navigate(['admins-list']);
  }

  goBack(){
    this.router.navigate(['admins-list']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }
}
