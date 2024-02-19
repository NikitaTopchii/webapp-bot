import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChatSelectorComponent} from "./chat-selector/chat-selector.component";
import {TokenSelectorComponent} from "./token-selector/token-selector.component";

const routes: Routes = [
  {
    path: "tokens",
    component: TokenSelectorComponent,
  },
  {
    path: "chat-token-selector/:id",
    component: ChatSelectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatTokenRoutingModule {}
