import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatTokenService} from "../../core/services/chat-token/chat-token.service";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {

  form: FormGroup;
  constructor(private readonly fb: FormBuilder,
              public dialogRef: MatDialogRef<ConfirmDialogComponent>,
              private chatTokenService: ChatTokenService) {
    this.form = this.getTokenForm();
  }

  ngOnInit() {
  }

  getTokenForm(){
    return this.fb.group({
      tokenName: ['tokenName',[Validators.required,Validators.maxLength(32)]],
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  deleteToken(form: any) {
    if(form.get('tokenName')?.value === localStorage.getItem('tokenName')){
      const formData = new FormData();

      formData.append('tokenId', localStorage.getItem('tokenId') || '');

      this.chatTokenService.deleteToken(formData).subscribe((response) => {
        localStorage.removeItem('tokenId');
        this.closeModal();
      });
    }
  }
}
