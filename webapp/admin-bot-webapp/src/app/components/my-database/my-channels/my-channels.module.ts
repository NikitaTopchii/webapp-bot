import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyChannelsRoutingModule} from "./my-channels-routing.module";
import {MyChannelsComponent} from "./my-channels.component";



@NgModule({
  declarations: [MyChannelsComponent],
  imports: [
    CommonModule,
    MyChannelsRoutingModule
  ]
})
export class MyChannelsModule { }
