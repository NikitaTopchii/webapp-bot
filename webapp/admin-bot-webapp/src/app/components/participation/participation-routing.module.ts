import {RouterModule, Routes} from "@angular/router";
import {
  PrivateNewsLetterByCompetitionComponent
} from "../news-letter/private-news-letter/private-news-letter-by-competition/private-news-letter-by-competition.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: "competition-participation",
    component: PrivateNewsLetterByCompetitionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParticipationRoutingModule {}
