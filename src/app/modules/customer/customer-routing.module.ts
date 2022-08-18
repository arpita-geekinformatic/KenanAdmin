import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: CustomerListComponent, data: { title: 'Company', breadcrumb: 'Company'} },
      { path: "add", component: AddCustomerComponent, data: { title: 'Company', breadcrumb: 'Company'} },
      { path: "update", component: AddCustomerComponent, data: { title: 'Company', breadcrumb: 'Company'} },
     
      {
        path: '**',
        redirectTo: '/admins'
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
