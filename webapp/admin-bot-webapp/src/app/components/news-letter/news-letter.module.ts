import {NgModule} from "@angular/core";
import {
  PrivateNewsLetterByCompetitionComponent
} from "./private-news-letter-by-competition/private-news-letter-by-competition.component";
import {PublicNewsLetterByChatComponent} from "./public-news-letter-by-chat/public-news-letter-by-chat.component";
import {CommonModule, NgForOf} from "@angular/common";
import {NewsLetterRoutingModule} from "./news-letter-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {
  ChannelsWithCompetitionsComponent
} from "./channels-with-competitions/channels-with-competitions.component";
import {CompetitionTypesListComponent} from "./competition-types-list/competition-types-list.component";
import {
  ActiveCompetitionsListComponent
} from "./active-competitions-list/active-competitions-list.component";

@NgModule({
  declarations: [
    PrivateNewsLetterByCompetitionComponent,
    PublicNewsLetterByChatComponent,
    ChannelsWithCompetitionsComponent,
    CompetitionTypesListComponent,
    ActiveCompetitionsListComponent
  ],
  imports: [
    CommonModule,
    NewsLetterRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [],
})
export class NewsLetterModule {}
