import {NgModule} from "@angular/core";
import {
  PrivateNewsLetterByCompetitionComponent
} from "./private-news-letter/private-news-letter-by-competition/private-news-letter-by-competition.component";
import {PublicNewsLetterByChatComponent} from "./public-news-letter/public-news-letter-by-chat/public-news-letter-by-chat.component";
import {CommonModule, NgForOf} from "@angular/common";
import {NewsLetterRoutingModule} from "./news-letter-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {
  ChannelsWithCompetitionsComponent
} from "./private-news-letter/channels-with-competitions/channels-with-competitions.component";
import {CompetitionTypesListComponent} from "./private-news-letter/competition-types-list/competition-types-list.component";
import {
  ActiveCompetitionsListComponent
} from "./private-news-letter/active-competitions-list/active-competitions-list.component";
import {NewsLetterComponent} from "./news-letter.component";
import {PublicNewsLetterModule} from "./public-news-letter/public-news-letter.module";
import {PrivateNewsLetterModule} from "./private-news-letter/private-news-letter.module";
import {PrivateNewsLetterRoutingModule} from "./private-news-letter/private-news-letter-routing.module";
import {PublicNewsLetterRoutingModule} from "./public-news-letter/public-news-letter-routing.module";

@NgModule({
  declarations: [NewsLetterComponent],
  imports: [
    CommonModule,
    PublicNewsLetterModule,
    PrivateNewsLetterModule,
    NewsLetterRoutingModule
  ],
  providers: [],
})
export class NewsLetterModule {}
