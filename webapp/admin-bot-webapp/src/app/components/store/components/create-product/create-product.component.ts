import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { StoreService } from "../../shared/service/store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { Observable, switchMap } from "rxjs";
import { CompetitionService } from "../../../core/services/competition/competition.service";
import { TelegramService } from "../../../core/services/telegram/telegram.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnInit {
  private fb = inject(FormBuilder);
  private storeService = inject(StoreService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private telegram = inject(TelegramService);

  private productId: number = +this.route.snapshot.params['id'];
  private store_id: number = +this.route.snapshot.queryParams['store_id'];
  public product$: Observable<any> = this.storeService.getProductById(+this.productId);
  public isEditMode: boolean = !!this.productId;
  public productForm = this.getProductForm();

  public ngOnInit(): void {
    if (this.isEditMode) {
      this.initPatchValue();
    }

    this.initBackButton();
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const product_media = target.files ? target.files[0] : null;

    if(product_media) {
      this.productForm.patchValue({ product_media });
    }
  }

  public isImgVisible(): boolean {
    return !!this.productForm.get('product_media')?.value && typeof this.productForm.get('product_media')?.value === 'string';
  }

  private initPatchValue(): void {
    this.product$.subscribe(data => {
        this.productForm.patchValue(data);
    });
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

  private updateProduct(): void {
    this.product$.pipe(
      switchMap(({product_id, store_id, game_token_id}) => this.storeService.updateProduct({
        store_id,
        game_token_id,
        product_id,
        ...this.productForm.value
      })),
      switchMap(() => this.storeService.getProductById(this.productId))
    ).subscribe(({store_id}) => {
      this.router.navigate(['../../', store_id], {relativeTo: this.route});
    });
  }

  private createProduct(): void {
    this.route.queryParams.pipe(
      switchMap(({store_id, game_token_id}) => this.storeService.createProduct(
        {
          store_id,
          game_token_id,
          ...this.productForm.value
        }))
    ).subscribe(() => {
      this.router.navigate(['../', this.route.snapshot.queryParams['store_id']], {relativeTo: this.route});
    });
  }

  private initBackButton(): void {
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(() => this.goBack());
  }

  private goBack(): void {
    if (this.isEditMode) {
      this.router.navigate(['../../', this.store_id], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }
}
