import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PublicNewsLetterByChatComponent} from "./public-news-letter-by-chat/public-news-letter-by-chat.component";
import {ChatsSelectorComponent} from "./chats-selector/chats-selector.component";

const routes: Routes = [
  {
    path: "create-public-newsletter",
    component: PublicNewsLetterByChatComponent,
  },
  {
    path: '',
    component: ChatsSelectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicNewsLetterRoutingModule {}
