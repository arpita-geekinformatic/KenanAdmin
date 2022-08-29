import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftsRoutingModule } from './gifts-routing.module';
import { GiftsComponent } from './gifts.component';
import { AddgiftsComponent } from './addgifts/addgifts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    GiftsComponent,
    AddgiftsComponent,
  ],
  imports: [
    CommonModule,
    GiftsRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ]
})
export class GiftsModule { }
