import { Routes } from '@angular/router';
import {AdminListComponent} from "./components/admin-list/admin-list.component";
import {AddAdminPageComponent} from "./components/add-admin-page/add-admin-page.component";

export const routes: Routes = [
  {
    path: '',
    component: AdminListComponent
  },
  {
    path: 'add-new-admin',
    component: AddAdminPageComponent
  }
];
