import {RouterModule, Routes} from "@angular/router";
import {
  PrivateNewsLetterByCompetitionComponent
} from "./private-news-letter-by-competition/private-news-letter-by-competition.component";
import {PublicNewsLetterByChatComponent} from "../public-news-letter/public-news-letter-by-chat/public-news-letter-by-chat.component";
import {ChannelsWithCompetitionsComponent} from "./channels-with-competitions/channels-with-competitions.component";
import {CompetitionTypesListComponent} from "./competition-types-list/competition-types-list.component";
import {ActiveCompetitionsListComponent} from "./active-competitions-list/active-competitions-list.component";
import {NgModule} from "@angular/core";
import {FinishedCompetitionsListComponent} from "./finished-competitions-list/finished-competitions-list.component";

const routes: Routes = [
  {
    path: "private-news-letter",
    component: PrivateNewsLetterByCompetitionComponent,
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
  },
  {
    path: "finished-competitions-list",
    component: FinishedCompetitionsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateNewsLetterRoutingModule {}
