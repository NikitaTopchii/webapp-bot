import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserWebappRoutingModule} from "./user-webapp-routing.module";
import {UserWebappComponent} from "./user-webapp.component";



@NgModule({
  declarations: [UserWebappComponent],
  imports: [
    CommonModule,
    UserWebappRoutingModule
  ]
})
export class UserWebappModule { }
