import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashbaordComponent } from './dashbaord.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CountToModule } from 'angular-count-to';
import {  NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashbaordComponent
  ],
  imports: [
    CommonModule,

    DashboardRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CountToModule,
    Ng2SmartTableModule,
    NgChartsModule ,
  ]
})
export class DashboardModule { }
