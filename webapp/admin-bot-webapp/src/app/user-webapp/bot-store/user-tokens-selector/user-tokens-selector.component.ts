import {Component, OnInit} from '@angular/core';
import {UserTokensService} from "../../core/services/user-tokens/user-tokens.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-tokens-selector',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './user-tokens-selector.component.html',
  styleUrl: './user-tokens-selector.component.scss'
})
export class UserTokensSelectorComponent implements OnInit{

  private currentUser: any;
  private tokenList: any[] = [];
  constructor(private userTokensService: UserTokensService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
  }

  ngOnInit() {
    this.getTokensList();
  }

  getTokensList(){
    this.userTokensService.getUserTokens(this.currentUser.userId).subscribe((tokens) => {
      this.tokenList = tokens;
    })
  }

  getTokenList(){
    return this.tokenList;
  }

  redirectToBotStore(tokenId: any) {
    this.router.navigate(['/bot-store/current-token-store', tokenId])
  }
}
