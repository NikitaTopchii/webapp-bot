import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddStoreDialogComponent } from "../add-store-dialog/add-store-dialog.component";
import { switchMap } from "rxjs";
import { StoreService } from "../../service/store.service";
import { StoreListComponent } from "../store-list/store-list.component";

@Component({
  selector: 'app-store-main',
  templateUrl: './store-main.component.html',
  standalone: true,
  imports: [
    StoreListComponent
  ],
  styleUrl: './store-main.component.scss'
})
export class StoreMainComponent {
  private owner_id: string = localStorage.getItem('user_id') || '';
  constructor(private dialog: MatDialog,
              private storeService: StoreService,) {
  }

  openAddStoreDialog() {
    this.dialog.open(AddStoreDialogComponent)
      .afterClosed().pipe(
        switchMap((result: any) => this.storeService.createStore({...result, owner_id: this.owner_id}))
    ).subscribe(data => {
      console.log(data)
    })
  }
}
