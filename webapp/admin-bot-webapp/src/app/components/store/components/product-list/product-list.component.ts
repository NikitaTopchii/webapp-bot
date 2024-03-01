import {Component} from '@angular/core';
import { switchMap } from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {StoreService, UpdateProductRequest} from "../../service/store.service";

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
    this.productList$.subscribe(console.log)
  }

  deleteProduct(product_id: string) {
    this.storeService.deleteProductById(product_id).subscribe();
  }

  redirectToProductEdit(product_id: string) {
    this.router.navigate([`/store/edit-product/${product_id}`], {relativeTo: this.route})
  }
}
