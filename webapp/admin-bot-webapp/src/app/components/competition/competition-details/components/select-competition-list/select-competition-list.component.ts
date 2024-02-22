import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TelegramService } from "../../../../core/services/telegram/telegram.service";

@Component({
  selector: 'app-select-competition-list',
  templateUrl: './select-competition-list.component.html',
  styleUrl: './select-competition-list.component.scss'
})
export class SelectCompetitionListComponent implements OnInit {

  constructor(private router: Router,
              private telegram: TelegramService) {
  }

  public ngOnInit() {
    this.initBackButton();
  }

  private initBackButton() {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(() => this.goBack());
  }

  private goBack(): void {
    this.router.navigate(['/']);
  }
}
