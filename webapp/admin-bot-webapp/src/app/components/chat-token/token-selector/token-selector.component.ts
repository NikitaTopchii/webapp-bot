import { Component } from '@angular/core';
import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {Router} from "@angular/router";
import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatTokenService} from "../../core/services/chat-token/chat-token.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {ChatSelectorDialogComponent} from "../chat-selector-dialog/chat-selector-dialog.component";

interface ValidTokenState{
  tokenExist: boolean;
  addingTokenSuccess: boolean;
}

interface Token{
  tokenName: string,
  tokenId: string,
  chats?: any[],
  selected: boolean
}

@Component({
  selector: 'app-token-selector',
  templateUrl: './token-selector.component.html',
  styleUrl: './token-selector.component.scss'
})
export class TokenSelectorComponent {

  private selectedChannels: Set<TelegramEntityInterface> = new Set<TelegramEntityInterface>();
  private selectedChannelIds: string[] = [];

  selectElementsExist: boolean = false;

  validToken: ValidTokenState = {
    tokenExist: false,
    addingTokenSuccess: false
  };

  private tokensList = new Set<Token>();

  form: FormGroup;

  constructor(private readonly fb: FormBuilder,
              private telegram: TelegramService,
              private router: Router,
              private chatTokenService: ChatTokenService,
              private selectedChannelsService: SelectedChannelsService,
              public matDialog: MatDialog) {
    this.form = this.getTokenForm();
    this.goBack = this.goBack.bind(this);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);

    this.getTokensByAdminId();

    this.form.valueChanges.subscribe(() => {
      this.validToken.tokenExist = false;
      this.validToken.addingTokenSuccess = false;
    })
  }

  getTokenList(){
    return this.tokensList;
  }

  getTokensByAdminId(){
    this.tokensList.clear();

    const formData = new FormData();

    formData.append('owner_id', localStorage.getItem('user_id') || '');

    this.chatTokenService.getTokens(formData).subscribe((response) => {
      response.results.forEach((token:any) => {
        this.chatTokenService.getChatIds(token.id).subscribe((chatsId) => {
          this.tokensList.add({
            tokenName: token.name,
            tokenId: token.id,
            chats: chatsId.chatIds,
            selected: false
          });
        })
      })
    })
  }

  getTokenForm(){
    return this.fb.group({
      tokenName: ['tokenName', Validators.maxLength(32)],
      shortTokenName: ['TKN', Validators.maxLength(4)]
    });
  }

  goBack(){
    this.matDialog.closeAll();
    this.router.navigate(['/admin-webapp']);
  }

  addNewToken(form: FormGroup) {
    const formData = new FormData();

    formData.append('name', form.get('tokenName')?.value);
    formData.append('shortName', form.get('shortTokenName')?.value);
    formData.append('owner', localStorage.getItem('user_id') || '');

    this.chatTokenService.tokenExist(formData).subscribe((response) => {
      if(response.tokenExist){
        console.log(response.tokenExist)
        this.validToken.tokenExist = true;
      }else{
        console.log(response.tokenExist)
        this.chatTokenService.addChatToken(formData).subscribe((response) => {

          this.validToken.addingTokenSuccess = true;

          this.getTokensByAdminId();
        })
      }
    })
  }

  invalidTokenState() {
    return this.validToken.tokenExist;
  }

  validTokenState(){
    return this.validToken.addingTokenSuccess;
  }

  openConfirmDialog(tokenId: string, tokenName: string) {
    localStorage.setItem('tokenId', tokenId);
    localStorage.setItem('tokenName', tokenName);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "400px";
    dialogConfig.backdropClass = 'back-drop'
    const modalDialog = this.matDialog.open(ConfirmDialogComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(() => {
      this.getTokensByAdminId();
    })
  }

  openChatSelector(id: string, tokenName: string) {
    localStorage.setItem('tokenId', id);
    localStorage.setItem('tokenName', tokenName);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-component";
    dialogConfig.height = "400px";
    dialogConfig.width = "400px";
    dialogConfig.backdropClass = 'back-drop'
    const modalDialog = this.matDialog.open(ChatSelectorDialogComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(() => {
      this.getTokensByAdminId();
    })
  }

  showTokensChat(token: Token) {
    if(token.chats){
      token.selected = !token.selected;
    }
  }
}
