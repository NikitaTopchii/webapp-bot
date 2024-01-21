import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {
  CompetitionEndpointSelectorComponent
} from "./competition-endpoint-selector/competition-endpoint-selector.component";
import {CompetitionCreatorComponent} from "./competition-creator/competition-creator.component";
import {CompetitionRoutingModule} from "./competition-routing.module";
import {ChannelsService} from "../core/services/channels/channels.service";

@NgModule({
  declarations: [
    CompetitionEndpointSelectorComponent,
    CompetitionCreatorComponent
  ],
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [ChannelsService],
})
export class CompetitionModule {}