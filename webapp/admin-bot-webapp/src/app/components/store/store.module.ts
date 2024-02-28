import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import {StoreDetailsComponent} from "./components/store-details/store-details.component";
import {ProductListComponent} from "./components/product-list/product-list.component";


@NgModule({
  declarations: [StoreDetailsComponent, ProductListComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
  ]
})
export class StoreModule { }
