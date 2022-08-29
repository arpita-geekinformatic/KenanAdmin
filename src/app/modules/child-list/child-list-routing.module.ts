import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildListComponent } from './child-list.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: ChildListComponent, data: { title: 'Childs', breadcrumb: 'Childs' } },
    

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
export class ChildListRoutingModule { }
