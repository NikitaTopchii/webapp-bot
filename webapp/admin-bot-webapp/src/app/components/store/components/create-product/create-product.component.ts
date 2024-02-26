import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { StoreService } from "../../service/store.service";
import { ActivatedRoute } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { switchMap } from "rxjs";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  private fb = inject(FormBuilder);
  private storeService = inject(StoreService);
  private route = inject(ActivatedRoute);
  public productForm = this.getProductForm();

  constructor() {
  }

  private getProductForm(): FormGroup {
    return this.fb.group({
      product_name: ['', Validators.required],
      product_description: ['', Validators.required],
      product_amount: ['', Validators.required],
      product_price: ['', Validators.required],
      product_media: ['', Validators.required],
    })
  }

  onSubmit() {
    this.route.queryParams.pipe(
      switchMap(({store_id, game_token_id}) => this.storeService.createProduct({
        store_id,
        game_token_id,
        ...this.productForm.value
      }))
    ).subscribe(data => {
      console.log(data)
    })
  }
}
