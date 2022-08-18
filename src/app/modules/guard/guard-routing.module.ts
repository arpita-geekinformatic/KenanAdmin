import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAdminsComponent } from '../admins/add-admins/add-admins.component';
import { GuardListComponent } from './guard-list/guard-list.component';
import { UpdateGuardComponent } from './update-guard/update-guard.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: GuardListComponent, data: { title: 'guards', breadcrumb: 'Guards' } },
      { path: "edit", component: AddAdminsComponent, data: { title: 'Admins', breadcrumb: 'Admin' } },
     /*  { 
        path: '**',
        redirectTo: '/admins'
      },
   */ 
      { path: "edit/:id", component: AddAdminsComponent, data: { title: 'Admins', breadcrumb: 'Admin' } },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuardRoutingModule { }
