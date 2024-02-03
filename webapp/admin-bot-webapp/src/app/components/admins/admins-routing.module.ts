import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminListComponent} from "./admin-list/admin-list.component";
import {EditAdminPermissionsPageComponent} from "./edit-permissions-page/edit-admin-permissions-page.component";
import {AddChatForAdminComponent} from "./add-chat-for-admin/add-chat-for-admin.component";

const routes: Routes = [
  {
    path: "",
    component: AdminListComponent,
  },
  {
    path: 'edit-admin-permissions',
    component: EditAdminPermissionsPageComponent
  },
  {
    path: 'add-chat/:id',
    component: AddChatForAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule {}
