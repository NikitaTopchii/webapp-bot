import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatTokenRoutingModule} from "./chat-token-routing.module";
import {TokenSelectorComponent} from "./token-selector/token-selector.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ChatSelectorComponent} from "./chat-selector/chat-selector.component";
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";



@NgModule({
  declarations: [TokenSelectorComponent, ChatSelectorComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    ChatTokenRoutingModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatHint,
    ReactiveFormsModule
  ]
})
export class ChatTokenModule { }
