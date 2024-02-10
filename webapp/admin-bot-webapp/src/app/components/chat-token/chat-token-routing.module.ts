import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ChatSelectorComponent} from "./chat-selector/chat-selector.component";
import {TokenSelectorComponent} from "./token-selector/token-selector.component";

const routes: Routes = [
  {
    path: "",
    component: ChatSelectorComponent,
  },
  {
    path: "setup-token",
    component: TokenSelectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatTokenRoutingModule {}
