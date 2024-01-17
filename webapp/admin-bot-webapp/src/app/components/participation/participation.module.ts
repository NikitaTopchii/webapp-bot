import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {CompetitionParticipationComponent} from "./competition-participation/competition-participation.component";



@NgModule({
  declarations: [CompetitionParticipationComponent],
  imports: [
    CommonModule,
    NgOptimizedImage
  ]
})
export class ParticipationModule { }
