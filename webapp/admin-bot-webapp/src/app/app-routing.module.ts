import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainAdminPageComponent} from "./components/main/main-admin-page/main-admin-page.component";
import {
  CompetitionEndpointSelectorComponent
} from "./components/competition/competition-endpoint-selector/competition-endpoint-selector.component";

const routes: Routes = [
  {
    path: '',
    component: MainAdminPageComponent
  },
  {
    path: 'competitions',
    loadChildren: () => import("./components/competition/competition.module").then((m) => m.CompetitionModule)
  },
  {
    path: 'news-letter',
    loadChildren: () => import("./components/news-letter/news-letter.module").then((m) => m.NewsLetterModule)
  },
  {
    path: 'participation',
    loadChildren: () => import("./components/participation/participation.module").then((m) => m.ParticipationModule)
  },
  {
    path: 'admins',
    loadChildren: () => import("./components/admins/admins.module").then((m) => m.AdminsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
