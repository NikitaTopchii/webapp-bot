import { Component } from '@angular/core';
import {ChatTokenService} from "../../core/services/chat-token/chat-token.service";

interface Token{
  tokenName: string,
  tokenId: string
}
@Component({
  selector: 'app-my-tokens',
  templateUrl: './my-tokens.component.html',
  styleUrl: './my-tokens.component.scss'
})
export class MyTokensComponent {

  tokensList: Token[] = [];
  constructor(private chatTokenService: ChatTokenService) {
  }

  getTokensByAdminId(){
    const formData = new FormData();

    formData.append('owner_id', localStorage.getItem('user_id') || '');

    this.chatTokenService.getTokens(formData).subscribe((response) => {
      response.results.forEach((token:any) => {
        this.tokensList.push({
          tokenName: token.name,
          tokenId: token.id
        });
      })
    })
  }

  getTokenList(){
    return this.tokensList;
  }

  getDownloadStats(tokenId?: string) {

  }
}
