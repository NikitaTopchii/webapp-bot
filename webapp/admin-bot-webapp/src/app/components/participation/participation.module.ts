import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ParticipationCoreComponent} from "./participation-core.component";
import {ReactiveFormsModule} from "@angular/forms";
import {
  ParticipationWithConditionsComponent
} from "./participation-with-conditions/participation-with-conditions.component";
import {ParticipationRoutingModule} from "./participation-routing.module";



@NgModule({
  declarations: [
    ParticipationWithConditionsComponent,
    ParticipationCoreComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ParticipationRoutingModule,
    ReactiveFormsModule
  ]
})
export class ParticipationModule { }
