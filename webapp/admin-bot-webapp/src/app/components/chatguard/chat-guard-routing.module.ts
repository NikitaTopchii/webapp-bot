import {RouterModule, Routes} from "@angular/router";
import {MyChannelsComponent} from "../my-database/my-channels/my-channels.component";
import {NgModule} from "@angular/core";
import {ChatsSelectorComponent} from "./chats-selector.component";
import {ChatGuardSettingsComponent} from "./chat-guard-settings/chat-guard-settings.component";
import {StopWordsListComponent} from "./stop-words-list/stop-words-list.component";

const routes: Routes = [
  {
    path: 'chat-selector',
    component: ChatsSelectorComponent
  },
  {
    path: 'chat-guard-setting/:id',
    component: ChatGuardSettingsComponent
  },
  {
    path: 'stop-words-list/:id',
    component: StopWordsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatGuardRoutingModule {}
