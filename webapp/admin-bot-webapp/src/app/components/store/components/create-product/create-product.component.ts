import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { StoreService } from "../../service/store.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MatButton } from "@angular/material/button";
import {Observable, switchMap} from "rxjs";
import {CompetitionService} from "../../../core/services/competition/competition.service";

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
export class CreateProductComponent implements OnInit {
  public isEditMode: boolean = false;


  private fb = inject(FormBuilder);
  private storeService = inject(StoreService);
  private route = inject(ActivatedRoute);
  public productForm = this.getProductForm();
  private router = inject(Router);

  constructor() {
    if(this.productId){
      this.isEditMode = true;
    }
  }


  private productId: string = this.route.snapshot.params['id']

  public product$: Observable<any> = this.storeService.getProductById(this.productId);


  ngOnInit() {
    this.initPatchValue()
    this.product$.subscribe(console.log)
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
    if(this.isEditMode) {
      this.product$.pipe(
        switchMap(({product_id ,store_id, game_token_id }) => this.storeService.updateProduct({
          store_id,
          game_token_id,
          product_id,
          ...this.productForm.value
        }))
      ).subscribe(data => {
        console.log(data);
        this.router.navigate(['../../', this.route.snapshot.queryParams['store_id']], { relativeTo: this.route });
      });
    } else {
      this.route.queryParams.pipe(
        switchMap(({ store_id, game_token_id }) => this.storeService.createProduct({
          store_id,
          game_token_id,
          ...this.productForm.value
        }))
      ).subscribe(data => {
        console.log(data);
        this.router.navigate(['../', this.route.snapshot.queryParams['store_id']], { relativeTo: this.route });
      });
    }
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    const product_media = event.target.files[0];
    this.productForm.patchValue({product_media});
  }

  initPatchValue() {
    this.product$.subscribe(data => {
      if(this.isEditMode) {
        this.productForm.patchValue(data);
      }
    })
  }
}
