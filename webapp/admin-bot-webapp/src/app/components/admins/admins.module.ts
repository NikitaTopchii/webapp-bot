import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminsRoutingModule} from "./admins-routing.module";
import {AddChatForAdminComponent} from "./add-chat-for-admin/add-chat-for-admin.component";
import {AdminListComponent} from "./admin-list/admin-list.component";
import {AdminPermissionsComponent} from "./admin-permissions/admin-permissions.component";
import {ChatPermissionsComponent} from "./chat-permissions/chat-permissions.component";
import {EditAdminPermissionsPageComponent} from "./edit-permissions-page/edit-admin-permissions-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";



@NgModule({
  declarations: [
    AddChatForAdminComponent,
    AdminListComponent,
    AdminPermissionsComponent,
    ChatPermissionsComponent,
    EditAdminPermissionsPageComponent
  ],
  imports: [
    CommonModule,
    AdminsRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ]
})
export class AdminsModule { }
