import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ParticipationCoreComponent} from "./participation-core.component";
import {ReactiveFormsModule} from "@angular/forms";
import {
  ParticipationWithConditionsComponent
} from "./participation-with-conditions/participation-with-conditions.component";
import {ParticipationRoutingModule} from "./participation-routing.module";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";



@NgModule({
  declarations: [
    ParticipationWithConditionsComponent,
    ParticipationCoreComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ParticipationRoutingModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint,
    MatButton
  ]
})
export class ParticipationModule { }
