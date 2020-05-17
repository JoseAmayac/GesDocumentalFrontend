import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { StartComponent } from './start/start.component';
import { TopNavComponent } from './layouts/top-nav/top-nav.component';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client'

import { ComponentsModule } from 'src/app/components/components.module';
import { AdminModule } from './admin.module';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    SidebarComponent,
    StartComponent,
    TopNavComponent,
  ],
  imports: [
    ComponentsModule,
    NgxSpinnerModule,
    AdminModule,
    CommonModule,
    PagesRoutingModule,
    LoadingBarHttpClientModule
  ]
})
export class PagesModule { }
