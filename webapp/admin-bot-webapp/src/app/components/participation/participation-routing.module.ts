import {RouterModule, Routes} from "@angular/router";
import {
  PrivateNewsLetterByCompetitionComponent
} from "../news-letter/private-news-letter/private-news-letter-by-competition/private-news-letter-by-competition.component";
import {NgModule} from "@angular/core";
import {ParticipationCoreComponent} from "./participation-core.component";

const routes: Routes = [
  {
    path: "",
    component: ParticipationCoreComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipationRoutingModule {}
