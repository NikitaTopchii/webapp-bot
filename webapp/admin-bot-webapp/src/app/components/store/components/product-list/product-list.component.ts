import { Component } from '@angular/core';
import { switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from "../../service/store.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  public productList$ = this.route.params.pipe(
    switchMap(params => this.storeService.getProducts$(params['id']))
  )

  constructor(private storeService: StoreService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  public deleteProduct(product_id: number) {
    this.storeService.deleteProductById(product_id).subscribe();
  }

  public redirectToProductEdit(product_id: number, store_id: number): void {
    this.router.navigate([`/store/edit-product/${product_id}`], {relativeTo: this.route, queryParams: {store_id}})
  }
}
