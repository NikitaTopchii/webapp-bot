import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PermissionsComponent} from "../permissions/permissions.component";
import {Admin} from "../../core/admin";
import {PermissionsService} from "../../core/services/permissions/permissions.service";
import {EditAdminService} from "../../core/services/edit-admin/edit-admin.service";
import {Route, Router, RouterLink} from "@angular/router";

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
export class EditPermissionsPageComponent {

  private admin: Admin;
  private permissions: any;

  constructor(private permissionsService: PermissionsService, private editAdminService: EditAdminService, private router: Router) {
    this.admin = this.editAdminService.getAdmin();
    this.permissionsService.setCurrentAdminPermissions(this.admin?.permissions)
  }
  getAdmin(){
    return this.admin;
  }

  savePermissions(){
    this.permissions = this.permissionsService.getCurrentAdminPermissions();
    this.admin.setPermissions(this.permissions);
    this.router.navigate(['']);
  }
}
