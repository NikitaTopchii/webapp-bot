import {AdminListComponent} from "./components/admin-list/admin-list.component";
import {AddAdminPageComponent} from "./components/add-admin-page/add-admin-page.component";
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EditPermissionsPageComponent} from "./components/edit-permissions-page/edit-permissions-page.component";

const routes: Routes = [
  {
    path: '',
    component: AdminListComponent
  },
  {
    path: 'add-new-admin',
    component: AddAdminPageComponent
  },
  {
    path: 'edit-admin',
    component: EditPermissionsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
