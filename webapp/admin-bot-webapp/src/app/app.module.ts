import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule, HammerModule} from "@angular/platform-browser";
import {CommonModule, NgForOf} from "@angular/common";
import {AdminListComponent} from "./components/admins/admin-list/admin-list.component";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {CompetitionCreatorComponent} from "./components/competition/competition-creator/competition-creator.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IgxIconModule, IgxInputGroupModule, IgxTimePickerComponent, IgxTimePickerModule} from "igniteui-angular";

@NgModule({
  declarations: [
    AppComponent,CompetitionCreatorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AdminListComponent,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgForOf,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
