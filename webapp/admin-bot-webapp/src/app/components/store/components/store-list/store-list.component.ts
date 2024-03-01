import { Component } from '@angular/core';
import { StoreService } from "../../service/store.service";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss'
})
export class StoreListComponent {
  private readonly owner_id = localStorage.getItem('user_id') || '';
  constructor(private storeService: StoreService,
              private router: Router,
              private route: ActivatedRoute) { }
  public stores$ = this.storeService.getStores$(this.owner_id);

  public redirectToStoreDetails(store_id: string): void {
    this.router.navigate([store_id], {relativeTo: this.route});
  }
}
