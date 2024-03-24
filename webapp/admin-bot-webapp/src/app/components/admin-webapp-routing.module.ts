import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AdminWebappComponent} from "./admin-webapp.component";

const routes: Routes = [
  {
    path: '',
    component: AdminWebappComponent
  },
  {
    path: 'competitions',
    loadChildren: () => import("./competition/competition.module").then((m) => m.CompetitionModule)
  },
  {
    path: 'news-letter',
    loadChildren: () => import("./news-letter/news-letter.module").then((m) => m.NewsLetterModule)
  },
  {
    path: 'participation',
    loadChildren: () => import("./participation/participation.module").then((m) => m.ParticipationModule)
  },
  {
    path: 'admins',
    loadChildren: () => import("./admins/admins.module").then((m) => m.AdminsModule)
  },
  {
    path: 'my-tokens',
    loadChildren: () => import("./chat-token/chat-token.module").then((m) => m.ChatTokenModule)
  },
  {
    path: 'my-database',
    loadChildren: () => import("./my-database/my-database.module").then((m) => m.MyDatabaseModule)
  },
  {
    path: 'chatguard',
    loadChildren: () => import("./chatguard/chat-guard.module").then((m) => m.ChatGuardModule)
  },
  {
    path: 'store',
    loadChildren: () => import("./store/store.module").then((m) => m.StoreModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminWebappRoutingModule {}

