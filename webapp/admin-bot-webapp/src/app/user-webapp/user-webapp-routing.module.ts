import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserWebappComponent} from "./user-webapp.component";

const routes: Routes = [
  {
    path: '',
    component: UserWebappComponent
  },
  {
    path: 'bot-store',
    loadChildren: () => import("./bot-store/bot-store.module").then((m) => m.BotStoreModule)
  },
  {
    path: 'user-competitions',
    loadChildren: () => import("./user-competitions/user-competitions.module").then((m) => m.UserCompetitionsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserWebappRoutingModule {}

