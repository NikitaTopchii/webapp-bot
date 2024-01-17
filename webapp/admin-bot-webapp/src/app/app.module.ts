import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {NewsLetterModule} from "./components/news-letter/news-letter.module";
import {CompetitionModule} from "./components/competition/competition.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TelegramService} from "./components/core/services/telegram/telegram.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NewsLetterModule,
    CompetitionModule
  ],
  providers: [TelegramService],
  bootstrap: [AppComponent]
})
export class AppModule { }
