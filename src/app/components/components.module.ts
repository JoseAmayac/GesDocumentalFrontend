import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { Error500Component } from './common/error500/error500.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DashboardHeaderComponent,
    Error500Component
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    DashboardHeaderComponent,
    Error500Component
  ]
})
export class ComponentsModule { }
