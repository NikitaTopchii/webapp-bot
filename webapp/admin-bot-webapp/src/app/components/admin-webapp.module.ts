
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminWebappRoutingModule} from "./admin-webapp-routing.module";
import {ParticipationModule} from "./participation/participation.module";
import {NewsLetterModule} from "./news-letter/news-letter.module";
import {CompetitionModule} from "./competition/competition.module";
import {ChatTokenModule} from "./chat-token/chat-token.module";
import {MyDatabaseModule} from "./my-database/my-database.module";
import {AdminsModule} from "./admins/admins.module";
import {AdminWebappComponent} from "./admin-webapp.component";
import {LanguageSelectorComponent} from "./language-selector/language-selector.component";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [AdminWebappComponent, LanguageSelectorComponent],
  imports: [
    CommonModule,
    AdminWebappRoutingModule,
    ParticipationModule,
    NewsLetterModule,
    CompetitionModule,
    ChatTokenModule,
    MyDatabaseModule,
    AdminsModule,
    FormsModule
  ]
})
export class AdminWebappModule { }
