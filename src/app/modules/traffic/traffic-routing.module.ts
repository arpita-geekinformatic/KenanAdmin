import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrafficListComponent } from './traffic-list/traffic-list.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: TrafficListComponent, data: { title: 'guards', breadcrumb: 'Guards' } },
      { path: "/edit/:id", component: TrafficListComponent, data: { title: 'browserinspection', breadcrumb: 'Admin' } },  
      { path: "/edit", component: TrafficListComponent, data: { title: 'browserinspection', breadcrumb: 'Admin' } },
      {
        path: '**',
        redirectTo: '/admins'
      }
    ],
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrafficRoutingModule { }
