import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CompanyListComponent } from './company-list/company-list.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: CompanyListComponent, data: { title: 'Company', breadcrumb: 'Company'} },
      { path: "add", component: AddCompanyComponent, data: { title: 'Company', breadcrumb: 'Company'} },
      { path: "update", component: AddCompanyComponent, data: { title: 'Company', breadcrumb: 'Company'} },
     
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
export class CompanyRoutingModule { }
