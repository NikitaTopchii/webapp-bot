import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {StoreDetails, StoreService} from "../../service/store.service";
import {Observable, switchMap} from "rxjs";

@Component({
  selector: 'app-store-details',
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
    this.currentStore$.subscribe(({store_id, game_token_id}) => {
      this.router.navigate(['/store/create-product'], {
        relativeTo: this.route,
        queryParams: {
          store_id,
          game_token_id
        }
      })
    })
  }
}
