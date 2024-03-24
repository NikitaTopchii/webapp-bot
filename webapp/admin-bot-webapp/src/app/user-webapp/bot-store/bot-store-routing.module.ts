import {RouterModule, Routes} from "@angular/router";
import {UserWebappComponent} from "../user-webapp.component";
import {NgModule} from "@angular/core";
import {UserTokensSelectorComponent} from "./user-tokens-selector/user-tokens-selector.component";
import {BotStoreItemsComponent} from "./bot-store-items/bot-store-items.component";

const routes: Routes = [
  {
    path: '',
    component: UserTokensSelectorComponent
  },
  {
    path: 'current-token-store/:id',
    component: BotStoreItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BotStoreRoutingModule {}

