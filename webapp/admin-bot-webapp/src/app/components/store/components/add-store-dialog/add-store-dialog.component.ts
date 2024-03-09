import { afterNextRender, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ChatTokenService } from "../../../core/services/chat-token/chat-token.service";
import { map, Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";

interface Token {
  name: string;
  id: number;
  owner: number;
}

@Component({
  selector: 'app-add-store-dialog',
  templateUrl: './add-store-dialog.component.html',
  styleUrl: './add-store-dialog.component.scss'
})
export class AddStoreDialogComponent {
  public createStoreForm: FormGroup = this.fb.group({
    store_name: ['', Validators.required],
    store_description: ['', Validators.required],
    game_token_id: [null, Validators.required]
  });
  public tokenList$: Observable<Token[]> = this.getTokens$();
  constructor(public dialogRef: MatDialogRef<AddStoreDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { name: string, description: string, tokenId: string },
              private fb: FormBuilder,
              private chatTokenService: ChatTokenService) {
  }

  public createStore(): void {
    this.dialogRef.close(this.createStoreForm.value);
  }

  private getTokens$(): Observable<Token[]> {
    const user_id = localStorage.getItem('user_id') || '';
    const formData = new FormData();
    formData.append('owner_id', user_id);
    return this.chatTokenService.getTokens(formData).pipe(
      map((response: any) => response.results)
    )
  }
}
