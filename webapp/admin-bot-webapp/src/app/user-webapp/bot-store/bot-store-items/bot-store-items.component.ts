import {Component, OnInit} from '@angular/core';
import {UserTokensService} from "../../core/services/user-tokens/user-tokens.service";
import {BotStoreService} from "../../core/services/bot-store/bot-store.service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";
@Component({
  selector: 'app-bot-store-items',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './bot-store-items.component.html',
  styleUrl: './bot-store-items.component.scss'
})
export class BotStoreItemsComponent implements OnInit{

  botItems: any[] = [];
  private tokenId: string = '';
  private userId: string = '';

  private isBoughtItem: boolean = true;

  private tokenData: any;
  constructor(
    private botStoreService: BotStoreService,
    private activatedRoute: ActivatedRoute,
    private userTokenService: UserTokensService
  ){
  }

  ngOnInit() {
    this.getBotStoreItems();

    this.activatedRoute.paramMap.subscribe(params => {
      this.tokenId = params.get('id') || '';
    });

    this.userId = localStorage.getItem('user_id') || '';

    this.checkBoughtItem();
    this.getUserTokenData();
  }

  getBotStoreItems(){
    this.botStoreService.getBotStoreItems().subscribe((items) => {
      this.botItems = items;
    })
  }

  getUserTokenData(){
    this.userTokenService.getUserTokenData(this.userId, this.tokenId).subscribe((tokenData) => {
      console.log(tokenData)
      this.tokenData = tokenData[0];
    })
  }

  getBotItems(){
    return this.botItems;
  }

  getBoughtItemId(){
    return this.isBoughtItem;
  }

  buyBotItem(itemId: any, itemPrice: any, itemType: any) {
    const tokensLeft = this.tokenData.tokenValue - itemPrice;

    this.isBoughtItem = true;

    const userTokenId = this.userId + ':' + this.tokenId;

    this.userTokenService.updateUserItem(userTokenId, tokensLeft, itemId, itemType);
  }

  checkBoughtItem(){
    const userTokenId = this.userId + ':' + this.tokenId;

    this.userTokenService.checkBoughtItem(userTokenId).subscribe((isBought) => {
      this.isBoughtItem = isBought;
    })
  }

  getBalance(){
    return this.tokenData.tokenValue;
  }
}
