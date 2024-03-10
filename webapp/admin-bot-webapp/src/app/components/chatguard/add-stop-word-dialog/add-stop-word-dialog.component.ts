import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ChatTokenService} from "../../core/services/chat-token/chat-token.service";
import {ChatGuardService} from "../../core/services/chatguard/chat-guard.service";

@Component({
  selector: 'app-add-stop-word-dialog',
  standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatLabel,
        NgIf,
        ReactiveFormsModule
    ],
  templateUrl: './add-stop-word-dialog.component.html',
  styleUrl: './add-stop-word-dialog.component.scss'
})
export class AddStopWordDialogComponent {
  private chatTokenExist = false;
  private loadingChatToken = true;

  form: FormGroup;
  constructor(private readonly fb: FormBuilder,
              public dialogRef: MatDialogRef<AddStopWordDialogComponent>,
              private chatGuardService: ChatGuardService) {
    this.form = this.getTokenForm();
  }

  ngOnInit() {
  }


  isLoadingChatToken(){
    return this.loadingChatToken;
  }

  isChatTokenExist(){
    return this.chatTokenExist;
  }

  getTokenForm(){
    return this.fb.group({
      stopWord: ['',[Validators.required,Validators.maxLength(32)]],
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  deleteToken(form: any) {
    const chatId = localStorage.getItem('chatId') || '';

    this.chatGuardService.addNewStopWord(form.get('stopWord').value, chatId).subscribe(() => {
      localStorage.removeItem('chatId');
      this.closeModal();
    });
  }
}
