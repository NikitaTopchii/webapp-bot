import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreDetailsComponent } from "./components/store-details/store-details.component";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { CreateProductComponent } from "./components/create-product/create-product.component";
import { AddStoreDialogComponent } from "./components/add-store-dialog/add-store-dialog.component";
import { StoreListComponent } from "./components/store-list/store-list.component";
import { StoreMainComponent } from "./components/store-main/store-main.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";


@NgModule({
  declarations: [
    StoreDetailsComponent,
    ProductListComponent,
    CreateProductComponent,
    AddStoreDialogComponent,
    StoreListComponent,
    StoreMainComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatDialogModule,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatButton
  ]
})
export class StoreModule {
}
