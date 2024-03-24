import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TelegramService} from "./components/core/services/telegram/telegram.service";
import {HttpClientModule} from "@angular/common/http";
import {AdminWebappModule} from "./components/admin-webapp.module";
import {UserWebappModule} from "./user-webapp/user-webapp.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminWebappModule,
    UserWebappModule
  ],
  providers: [TelegramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
