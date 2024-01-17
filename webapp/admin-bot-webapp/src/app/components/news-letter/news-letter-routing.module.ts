import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {
  PrivateNewsLetterByCompetitionComponent
} from "./private-news-letter-by-competition/private-news-letter-by-competition.component";
import {PublicNewsLetterByChatComponent} from "./public-news-letter-by-chat/public-news-letter-by-chat.component";
import {
  ChannelsWithCompetitionsComponent
} from "./channels-with-competitions/channels-with-competitions.component";
import {CompetitionTypesListComponent} from "./competition-types-list/competition-types-list.component";
import {
  ActiveCompetitionsListComponent
} from "./active-competitions-list/active-competitions-list.component";

const routes: Routes = [
  {
    path: "private-news-letter",
    component: PrivateNewsLetterByCompetitionComponent,
  },
  {
    path: "public-news-letter",
    component: PublicNewsLetterByChatComponent,
  },
  {
    path: "channels-with-competitions",
    component: ChannelsWithCompetitionsComponent
  },
  {
    path: "competition-types-list",
    component: CompetitionTypesListComponent
  },
  {
    path: "active-competitions-list",
    component: ActiveCompetitionsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsLetterRoutingModule {}
