import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyDatabaseComponent} from "./my-database.component";
import {MyDatabaseRoutingModule} from "./my-database-routing.module";



@NgModule({
  declarations: [MyDatabaseComponent],
  imports: [
    CommonModule,
    MyDatabaseRoutingModule
  ]
})
export class MyDatabaseModule { }
