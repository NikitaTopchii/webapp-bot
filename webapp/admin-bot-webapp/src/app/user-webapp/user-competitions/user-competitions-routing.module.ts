import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserCompetitionTypesComponent} from "./user-competition-types/user-competition-types.component";
import {ActiveUserCompetitionComponent} from "./active-user-competition/active-user-competition.component";
import {FinishedUserCompetitionComponent} from "./finished-user-competition/finished-user-competition.component";

const routes: Routes = [
  {
    path: '',
    component: UserCompetitionTypesComponent
  },
  {
    path: 'participating',
    component: ActiveUserCompetitionComponent
  },
  {
    path: 'was-participating',
    component: FinishedUserCompetitionComponent
  },
  {
    path: 'competition-details/:id'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCompetitionsRoutingModule {}

