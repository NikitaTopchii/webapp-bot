import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MyDatabaseComponent} from "./my-database.component";

const routes: Routes = [
  {
    path: 'main',
    component: MyDatabaseComponent
  },
  {
    path: 'my-tokens-stats',
    loadChildren: () => import("./my-tokens/my-tokens.module").then((m) => m.MyTokensModule)
  },
  {
    path: 'my-channels-stats',
    loadChildren: () => import("./my-channels/my-channels.module").then((m) => m.MyChannelsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyDatabaseRoutingModule {}
