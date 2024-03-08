import {Component, OnInit} from '@angular/core';
import {ChatTokenService} from "../../core/services/chat-token/chat-token.service";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {MainStatsComponent} from "../main-stats-component";
import {response} from "express";
import {Router} from "@angular/router";

interface Token{
  tokenName: string,
  tokenId: string
}
@Component({
  selector: 'app-my-tokens',
  templateUrl: './my-tokens.component.html',
  styleUrl: './my-tokens.component.scss'
})
export class MyTokensComponent extends MainStatsComponent implements OnInit{

  tokensList: Token[] = [];
  constructor(private chatTokenService: ChatTokenService,
              private router: Router,
              public override telegramService: TelegramService) {
    super(telegramService);
    console.log(this.telegramService.InitData)
    this.goBack = this.goBack.bind(this);
  }

  ngOnInit(): void {
    this.getTokensByAdminId();
    this.telegramService.BackButton.show();
    this.telegramService.BackButton.onClick(this.goBack);
  }

  goBack(){
    this.router.navigate(['/my-database/main']);
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

  protected override downloadAllElementsStats(statisticsType: string) {

    const elementIds = this.getTokenList().map((token) => token.tokenId).join(',');

    super.downloadAllElementsStats(statisticsType, elementIds);
  }
}
