import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {
  PrivateNewsLetterByCompetitionComponent
} from "./private-news-letter/private-news-letter-by-competition/private-news-letter-by-competition.component";
import {PublicNewsLetterByChatComponent} from "./public-news-letter/public-news-letter-by-chat/public-news-letter-by-chat.component";
import {
  ChannelsWithCompetitionsComponent
} from "./private-news-letter/channels-with-competitions/channels-with-competitions.component";
import {CompetitionTypesListComponent} from "./private-news-letter/competition-types-list/competition-types-list.component";
import {
  ActiveCompetitionsListComponent
} from "./private-news-letter/active-competitions-list/active-competitions-list.component";
import {NewsLetterComponent} from "./news-letter.component";

const routes: Routes = [
  {
    path: 'main',
    component: NewsLetterComponent
  },
  {
    path: 'public',
    loadChildren: () => import("./public-news-letter/public-news-letter.module").then((m) => m.PublicNewsLetterModule)
  },
  {
    path: 'private',
    loadChildren: () => import("./private-news-letter/private-news-letter.module").then((m) => m.PrivateNewsLetterModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsLetterRoutingModule {}
