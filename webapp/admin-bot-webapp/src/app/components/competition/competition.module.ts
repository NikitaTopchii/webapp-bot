import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import { MatNativeDateModule, MatOption } from "@angular/material/core";
import {CompetitionCreatorComponent} from "./competition-creator/competition-creator.component";
import {CompetitionRoutingModule} from "./competition-routing.module";
import {ChannelsService} from "../core/services/channels/channels.service";
import {
  CompetitionEndpointSelectorComponent
} from "./competition-endpoint-selector/competition-endpoint-selector.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {
    ContestConditionsComponent
} from "./competition-creator/components/contest-conditions/contest-conditions.component";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { GuessNumberComponent } from "./competition-creator/components/guess-number/guess-number.component";
import { DataConditionComponent } from "./competition-creator/components/data-condition/data-condition.component";
import { MatSelect } from "@angular/material/select";
import { MatButton } from "@angular/material/button";
import {CompetitionDetailsComponent} from "./competition-details/layout/competition-details.component";
import {
  EditableCompetitionDetailsComponent
} from "./competition-details/components/editable-competition-details/editable-competition-details.component";
import {
  ReadonlyCompetitionDetailsComponent
} from "./competition-details/components/readonly-competition-details/readonly-competition-details.component";
import {
  FinishedCompetitionsButtonsComponent
} from "./competition-details/components/action-buttons/finished-competitions-buttons/finished-competitions-buttons.component";
import {
  DraftCompetitionsButtonsComponent
} from "./competition-details/components/action-buttons/draft-competitions-buttons/draft-competitions-buttons.component";
import {
  ActiveCompetitionButtonsComponent
} from "./competition-details/components/action-buttons/active-competition-buttons/active-competition-buttons.component";
import {
  DelayedCompetitionButtonsComponent
} from "./competition-details/components/action-buttons/delayed-competition-buttons/delayed-competition-buttons.component";

@NgModule({
  declarations: [
    CompetitionCreatorComponent,
    CompetitionEndpointSelectorComponent,
    ContestConditionsComponent,
    GuessNumberComponent,
    DataConditionComponent,
    CompetitionDetailsComponent,
      EditableCompetitionDetailsComponent,
      ReadonlyCompetitionDetailsComponent,
    FinishedCompetitionsButtonsComponent,
    DraftCompetitionsButtonsComponent,
    ActiveCompetitionButtonsComponent,
    DelayedCompetitionButtonsComponent

  ],
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatChipsModule,
    MatCheckboxModule,
    MatMomentDateModule,
    MatRadioButton,
    MatRadioGroup,
    FormsModule,
    MatSelect,
    MatOption,
    MatButton,
  ],
  providers: [ChannelsService],
})
export class CompetitionModule {}
