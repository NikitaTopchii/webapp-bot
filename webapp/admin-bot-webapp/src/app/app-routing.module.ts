import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {BaseWebappComponent} from "./base-webapp/base-webapp.component";

const routes: Routes = [
  {
    path: '',
    component: BaseWebappComponent
  },
  {
    path: 'admin-webapp',
    loadChildren: () => import("./components/admin-webapp.module").then((m) => m.AdminWebappModule)
  },
  {
    path: 'user-webapp',
    loadChildren: () => import("./user-webapp/user-webapp.module").then((m) => m.UserWebappModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
