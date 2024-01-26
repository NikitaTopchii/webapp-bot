import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CompetitionTypesComponent} from "./competition-types/competition-types.component";

const routes: Routes = [
  {
    path: "",
    component: CompetitionTypesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCompetitionsRoutingModule{}
