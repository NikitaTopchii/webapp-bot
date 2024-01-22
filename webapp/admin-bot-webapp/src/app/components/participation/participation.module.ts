import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SubscribeParticipationComponent} from "./competition-participation/subscribe-participation.component";
import {ParticipationCoreComponent} from "./participation-core.component";



@NgModule({
  declarations: [
    SubscribeParticipationComponent,
    ParticipationCoreComponent],
  imports: [
    CommonModule,
    NgOptimizedImage
  ]
})
export class ParticipationModule { }
