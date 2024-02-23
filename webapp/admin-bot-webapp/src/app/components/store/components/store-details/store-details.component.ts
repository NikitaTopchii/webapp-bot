import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { StoreService } from "../../service/store.service";
import { Observable, switchMap } from "rxjs";
import { ProductListComponent } from "../product-list/product-list.component";

@Component({
  selector: 'app-store-details',
  standalone: true,
  imports: [
    ProductListComponent
  ],
  templateUrl: './store-details.component.html',
  styleUrl: './store-details.component.scss'
})
export class StoreDetailsComponent {
  public currentStore$ = this.route.params.pipe(
    switchMap(params => this.storeService.getStoreById(params['id']))
  )
    constructor(private route: ActivatedRoute,
                private storeService: StoreService) {
    this.currentStore$.subscribe(console.log)
    }
}
