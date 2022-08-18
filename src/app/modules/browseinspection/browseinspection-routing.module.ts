import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrowseinspectionComponent } from './add-browseinspection/add-browseinspection.component';
import { BrowseinspectionComponent } from './browseinspection/browseinspection.component';
import {InspectionDetailsComponent} from './inspection-details/inspection-details.component'
const routes: Routes = [
{
  path: "", 
   
      children: [
    { path: "", component: BrowseinspectionComponent, data:  { title: 'browse', breadcrumb: 'BrowseInspection' }},
    { path: "edit/:id", component:AddBrowseinspectionComponent, data:  { title: 'browse', breadcrumb: 'BrowseInspection' }},
    { path: "details/:id", component: InspectionDetailsComponent , data:  { title: 'browse', breadcrumb: 'BrowseInspection' }},
    { path: "add", component:AddBrowseinspectionComponent , data:  { title: 'browse', breadcrumb: 'BrowseInspection'}
    }
  ],
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowseinspectionRoutingModule { }
