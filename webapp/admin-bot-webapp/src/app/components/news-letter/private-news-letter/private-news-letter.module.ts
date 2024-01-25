import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrivateNewsLetterByCompetitionComponent
} from "./private-news-letter-by-competition/private-news-letter-by-competition.component";
import {ChannelsWithCompetitionsComponent} from "./channels-with-competitions/channels-with-competitions.component";
import {CompetitionTypesListComponent} from "./competition-types-list/competition-types-list.component";
import {ActiveCompetitionsListComponent} from "./active-competitions-list/active-competitions-list.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {PrivateNewsLetterRoutingModule} from "./private-news-letter-routing.module";
import {FinishedCompetitionsListComponent} from "./finished-competitions-list/finished-competitions-list.component";



@NgModule({
  declarations: [
    PrivateNewsLetterByCompetitionComponent,
    ChannelsWithCompetitionsComponent,
    CompetitionTypesListComponent,
    ActiveCompetitionsListComponent,
    FinishedCompetitionsListComponent
  ],
  imports: [
    CommonModule,
    PrivateNewsLetterRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ]
})
export class PrivateNewsLetterModule { }
