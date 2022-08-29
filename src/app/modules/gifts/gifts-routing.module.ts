import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddgiftsComponent } from './addgifts/addgifts.component';
import { GiftsComponent } from './gifts.component';

const routes: Routes = [

  {
    path: "",
    children: [
      { path: "", component: GiftsComponent, data: { title: 'Gifts', breadcrumb: 'Gifts' } },
      { path: "add", component: AddgiftsComponent, data: { title: 'Gifts', breadcrumb: ' Gifts' } },
      { path: "edit", component: AddgiftsComponent, data: { title: ' Gifts', breadcrumb: 'Gifts' } },

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
export class GiftsRoutingModule { }
