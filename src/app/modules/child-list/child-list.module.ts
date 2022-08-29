import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildListRoutingModule } from './child-list-routing.module';
import { ChildListComponent } from './child-list.component';


@NgModule({
  declarations: [
    ChildListComponent
  ],
  imports: [
    CommonModule,
    ChildListRoutingModule
  ]
})
export class ChildListModule { }
