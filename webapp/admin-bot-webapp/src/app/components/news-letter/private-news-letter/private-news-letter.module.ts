import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PrivateNewsLetterByCompetitionComponent
} from "./private-news-letter-by-competition/private-news-letter-by-competition.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {PrivateNewsLetterRoutingModule} from "./private-news-letter-routing.module";



@NgModule({
  declarations: [
    PrivateNewsLetterByCompetitionComponent
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
