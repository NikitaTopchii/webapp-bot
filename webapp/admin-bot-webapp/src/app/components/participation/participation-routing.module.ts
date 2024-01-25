import {RouterModule, Routes} from "@angular/router";
import {
  PrivateNewsLetterByCompetitionComponent
} from "../news-letter/private-news-letter/private-news-letter-by-competition/private-news-letter-by-competition.component";
import {NgModule} from "@angular/core";
import {ParticipationCoreComponent} from "./participation-core.component";
import {
  ParticipationWithConditionsComponent
} from "./participation-with-conditions/participation-with-conditions.component";

const routes: Routes = [
  {
    path: '',
    component: ParticipationCoreComponent,
  },
  {
    path: 'condition',
    component: ParticipationWithConditionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipationRoutingModule {}
