import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuardRoutingModule } from './guard-routing.module';
import { GuardListComponent } from './guard-list/guard-list.component';
import { UpdateGuardComponent } from './update-guard/update-guard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GuardListComponent,
    UpdateGuardComponent
  ],
  imports: [
    CommonModule,
    GuardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,

  ]
})
export class GuardModule { }
