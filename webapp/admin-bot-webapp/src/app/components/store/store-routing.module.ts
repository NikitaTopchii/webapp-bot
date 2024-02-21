import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreMainComponent } from "./components/store-main/store-main.component";
import { StoreDetailsComponent } from "./components/store-details/store-details.component";

const routes: Routes = [
  {
    path: '',
    component: StoreMainComponent,
  },
  {
    path: ':id',
    component: StoreDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
