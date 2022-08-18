import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseinspectionRoutingModule } from './browseinspection-routing.module';
import { BrowseinspectionComponent } from './browseinspection/browseinspection.component';
import { InspectionDetailsComponent } from './inspection-details/inspection-details.component';
import { AddBrowseinspectionComponent } from './add-browseinspection/add-browseinspection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    BrowseinspectionComponent,
    InspectionDetailsComponent,
    AddBrowseinspectionComponent
  ],
  imports: [
    CommonModule,
    BrowseinspectionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class BrowseinspectionModule { }
