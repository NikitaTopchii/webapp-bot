import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {
  CompetitionEndpointSelectorComponent
} from "./competition-endpoint-selector/competition-endpoint-selector.component";
import {CompetitionCreatorComponent} from "./competition-creator/competition-creator.component";

const routes: Routes = [
  {
    path: "competition-endpoint-selector",
    component: CompetitionEndpointSelectorComponent,
  },
  {
    path: "competition-creator",
    component: CompetitionCreatorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetitionRoutingModule {}
