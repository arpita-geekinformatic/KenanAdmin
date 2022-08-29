import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrafficRoutingModule } from './traffic-routing.module';
import { TrafficListComponent } from './traffic-list/traffic-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TrafficListComponent,

  ],
  imports: [
    CommonModule,
    TrafficRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TrafficModule { }
