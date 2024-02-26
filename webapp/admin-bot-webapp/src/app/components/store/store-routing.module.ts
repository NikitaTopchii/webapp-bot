import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreMainComponent } from "./components/store-main/store-main.component";
import { StoreDetailsComponent } from "./components/store-details/store-details.component";
import { CreateProductComponent } from "./components/create-product/create-product.component";

const routes: Routes = [
  {
    path: '',
    component: StoreMainComponent,
  },
  {
    path: ':id',
    component: StoreDetailsComponent
  },
  {
    path: 'create-product',
    component: CreateProductComponent
  },
  {
    path: 'edit-product/:id',
    component: CreateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
