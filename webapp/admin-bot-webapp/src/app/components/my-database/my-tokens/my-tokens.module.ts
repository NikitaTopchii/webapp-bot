import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyTokensRoutingModule} from "./my-tokens-routing.module";
import {MyTokensComponent} from "./my-tokens.component";



@NgModule({
  declarations: [MyTokensComponent],
  imports: [
    CommonModule,
    MyTokensRoutingModule
  ]
})
export class MyTokensModule { }
