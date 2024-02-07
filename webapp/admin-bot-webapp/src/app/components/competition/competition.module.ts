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

@NgModule({
  declarations: [
    CompetitionCreatorComponent,
    CompetitionEndpointSelectorComponent,
    ContestConditionsComponent,
    GuessNumberComponent,
    DataConditionComponent
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
