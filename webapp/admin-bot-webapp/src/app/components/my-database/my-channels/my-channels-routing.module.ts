import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MyChannelsComponent} from "./my-channels.component";

const routes: Routes = [
  {
    path: 'main-page',
    component: MyChannelsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyChannelsRoutingModule {}
