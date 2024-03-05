import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MyTokensComponent} from "./my-tokens.component";

const routes: Routes = [
  {
    path: 'main-page',
    component: MyTokensComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTokensRoutingModule {}
