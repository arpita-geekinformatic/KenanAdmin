import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TruckdetailsComponent } from './truckdetails/truckdetails.component';
const routes: Routes = [
  {
    path: "",
    children: [
       { path: "", component: TruckdetailsComponent, data: { title: 'Admins', breadcrumb: 'Drivers' } },
      
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
export class TruckRoutingModule { }
