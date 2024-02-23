import { Component } from '@angular/core';
import { switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { StoreService } from "../../service/store.service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  public productList$ = this.route.params.pipe(
    switchMap(params => this.storeService.getProducts$(params['id']))
  )
  constructor(private storeService: StoreService,
              private route: ActivatedRoute) {
    this.productList$.subscribe(console.log)
  }
}
