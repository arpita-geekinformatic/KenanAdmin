import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwsomeComponent } from './font-awsome/font-awsome.component';
import { MaterialDesignIconsComponent } from './material-design-icons/material-design-icons.component';
import { SimpleLineIconsComponent } from './simple-line-icons/simple-line-icons.component';
import { FeatherIconsComponent } from './feather-icons/feather-icons.component';
import { IonicIconsComponent } from './ionic-icons/ionic-icons.component';
import { FlagIconsComponent } from './flag-icons/flag-icons.component';
import { Pe7IconsComponent } from './pe7-icons/pe7-icons.component';
import { ThemifyIconsComponent } from './themify-icons/themify-icons.component';
import { TypiconsIconsComponent } from './typicons-icons/typicons-icons.component';
import { WeatherIconsComponent } from './weather-icons/weather-icons.component';
import { MaterialIconsComponent } from './material-icons/material-icons.component';
import { IconsRoutingModule } from './icons-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    FontAwsomeComponent,
    MaterialDesignIconsComponent,
    SimpleLineIconsComponent,
    FeatherIconsComponent,
    IonicIconsComponent,
    FlagIconsComponent,
    Pe7IconsComponent,
    ThemifyIconsComponent,
    TypiconsIconsComponent,
    WeatherIconsComponent,
    MaterialIconsComponent
  ],
  imports: [
    CommonModule,
    IconsRoutingModule,
    NgbModule
  ]
})
export class IconsModule { }
