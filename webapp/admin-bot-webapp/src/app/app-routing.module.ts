import {AdminListComponent} from "./components/admins/admin-list/admin-list.component";
import {AddAdminPageComponent} from "./components/admins/add-admin-page/add-admin-page.component";
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {EditPermissionsPageComponent} from "./components/admins/edit-permissions-page/edit-permissions-page.component";
import {
  ChannelsChatsListPageComponent
} from "./components/competition/channels-chats-list-page/channels-chats-list-page.component";
import {MainAdminPageComponent} from "./components/main/main-admin-page/main-admin-page.component";
import {CompetitionCreatorComponent} from "./components/competition/competition-creator/competition-creator.component";

const routes: Routes = [
  {
    path: '',
    component: MainAdminPageComponent
  },
  {
    path: 'add-new-admin',
    component: AddAdminPageComponent
  },
  {
    path: 'edit-admin',
    component: EditPermissionsPageComponent
  },
  {
    path: 'admins-list',
    component: AdminListComponent
  },
  {
    path: 'channels-list',
    component: ChannelsChatsListPageComponent
  },
  {
    path: 'competition-creator',
    component: CompetitionCreatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
