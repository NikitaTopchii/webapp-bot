import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CompetitionTypesComponent} from "./competition-types/competition-types.component";
import {CompetitionDraftsComponent} from "./competition-drafts/competition-drafts.component";
import {ActiveCompetitionsComponent} from "./active-competitions/active-competitions.component";



@NgModule({
  declarations: [CompetitionTypesComponent, CompetitionDraftsComponent, ActiveCompetitionsComponent],
  imports: [
    CommonModule
  ]
})
export class MyCompetitionsModule { }

