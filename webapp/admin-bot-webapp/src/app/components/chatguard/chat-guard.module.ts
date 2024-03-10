import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatGuardRoutingModule} from "./chat-guard-routing.module";
import {ChatsSelectorComponent} from "./chats-selector.component";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ChatGuardSettingsComponent} from "./chat-guard-settings/chat-guard-settings.component";
import {ReactiveFormsModule} from "@angular/forms";
import {StopWordsListComponent} from "./stop-words-list/stop-words-list.component";



@NgModule({
  declarations: [
    ChatsSelectorComponent,
    ChatGuardSettingsComponent,
    StopWordsListComponent],
  imports: [
    CommonModule,
    ChatGuardRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ]
})
export class ChatGuardModule { }
