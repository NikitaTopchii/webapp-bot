import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddStoreDialogComponent } from "../add-store-dialog/add-store-dialog.component";
import { switchMap } from "rxjs";
import { StoreService } from "../../shared/service/store.service";
import { StoreListComponent } from "../store-list/store-list.component";
import { TelegramService } from "../../../core/services/telegram/telegram.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-store-main',
  templateUrl: './store-main.component.html',
  styleUrl: './store-main.component.scss'
})
export class StoreMainComponent implements OnInit {
  private owner_id: string = localStorage.getItem('user_id') || '';

  constructor(private dialog: MatDialog,
              private storeService: StoreService,
              private telegram: TelegramService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.initBackButton();
  }

  public openAddStoreDialog(): void {
    this.dialog.open(AddStoreDialogComponent)
      .afterClosed().pipe(
      switchMap((result: any) => this.storeService.createStore({...result, owner_id: this.owner_id}))
    ).subscribe()
  }
  private initBackButton(): void {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(() => this.goBack());
  }

  private goBack(): void {
    this.router.navigate(['/']);
  }
}
