import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CustomerListComponent } from './customer-list/customer-list.component';


@NgModule({
  declarations: [
    AddCustomerComponent,
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class CustomerModule { }
