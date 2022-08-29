import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruckRoutingModule } from './truck-routing.module';
import { TruckdetailsComponent } from './truckdetails/truckdetails.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TruckdetailsComponent,
  
  ],
  imports: [
    CommonModule,
    TruckRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TruckModule { }
