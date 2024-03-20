import {RouterModule, Routes} from "@angular/router";
import {
  PrivateNewsLetterByCompetitionComponent
} from "./private-news-letter-by-competition/private-news-letter-by-competition.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: "private-news-letter/:id",
    component: PrivateNewsLetterByCompetitionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateNewsLetterRoutingModule {}
