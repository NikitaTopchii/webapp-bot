import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PublicNewsLetterByChatComponent} from "./public-news-letter-by-chat/public-news-letter-by-chat.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {PublicNewsLetterRoutingModule} from "./public-news-letter-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {ChatsSelectorComponent} from "./chats-selector/chats-selector.component";

@NgModule({
  declarations: [
    PublicNewsLetterByChatComponent,
    ChatsSelectorComponent
  ],
  imports: [
    CommonModule,
    PublicNewsLetterRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ]
})
export class PublicNewsLetterModule { }
