import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { CounselorRoutingModule } from './counselor-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';

import { ComponentsModule } from 'src/app/components/components.module';

import { FormsModule } from '@angular/forms'

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client'
import { LayoutsModule } from '../layouts/layouts.module';

@NgModule({
  declarations: [PrincipalComponent, WelcomeComponent],
  imports: [
    CommonModule,
    LayoutsModule,
    LoadingBarHttpClientModule,
    ComponentsModule,
    FormsModule,
    CounselorRoutingModule
  ]
})
export class CounselorModule { }
