import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {NewsLetterRoutingModule} from "./news-letter-routing.module";
import {NewsLetterComponent} from "./news-letter.component";
import {PublicNewsLetterModule} from "./public-news-letter/public-news-letter.module";
import {PrivateNewsLetterModule} from "./private-news-letter/private-news-letter.module";

@NgModule({
  declarations: [NewsLetterComponent],
  imports: [
    CommonModule,
    PublicNewsLetterModule,
    PrivateNewsLetterModule,
    NewsLetterRoutingModule
  ],
  providers: [],
})
export class NewsLetterModule {}
