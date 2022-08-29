import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "", component: UserListComponent, data: { title: 'Users', breadcrumb: 'Users'} },
      { path: "add", component:AddUserComponent, data: { title: 'Users', breadcrumb: 'Users'} },
      { path: "update", component: UserListComponent, data: { title: 'Users', breadcrumb: 'Users'} },
      { path: "edit", component:AddUserComponent , data: { title: 'Users', breadcrumb: 'Users' } },
      { path: "edit/:id", component:AddUserComponent, data: { title: 'Users', breadcrumb: 'Users' } },
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
export class UsersRoutingModule { }
