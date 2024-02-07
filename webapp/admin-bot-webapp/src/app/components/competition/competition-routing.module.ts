import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CompetitionCreatorComponent} from "./competition-creator/competition-creator.component";
import {
  CompetitionEndpointSelectorComponent
} from "./competition-endpoint-selector/competition-endpoint-selector.component";
import {CompetitionDetailsComponent} from "./competition-details/layout/competition-details.component";

const routes: Routes = [
  {
    path: "competition-creator",
    component: CompetitionCreatorComponent,
  },
  {
    path: 'competition-endpoint-selector',
    component: CompetitionEndpointSelectorComponent
  },
  {
    path: ':competitionId',
    component: CompetitionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompetitionRoutingModule {}
