import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {StoreDetails, StoreService} from "../../service/store.service";
import {Observable, switchMap} from "rxjs";
import { ProductListComponent } from "../product-list/product-list.component";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-store-details',
  standalone: true,
  imports: [
    ProductListComponent,
    NgForOf,
    AsyncPipe,
    MatButton,
  ],
  templateUrl: './store-details.component.html',
  styleUrl: './store-details.component.scss'
})
export class StoreDetailsComponent {
  public currentStore$: Observable<StoreDetails> = this.route.params.pipe(
    switchMap(params => this.storeService.getStoreById(params['id']))
  )
    constructor(private route: ActivatedRoute,
                private storeService: StoreService,
                private router: Router) {
    this.currentStore$.subscribe(console.log)
    }

  public addProduct(): void {
    this.currentStore$.subscribe(({store_id, store_token_id}) => {
      this.router.navigate(['/store/create-product'], {
        relativeTo: this.route,
        queryParams: {
          store_id,
          game_token_id: store_token_id
        }
      })
    })
  }
}
