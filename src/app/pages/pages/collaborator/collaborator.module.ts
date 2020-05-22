import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { ListFilesComponent } from './list-files/list-files.component';
import { ComponentsModule } from 'src/app/components/components.module';

import { RouterModule } from '@angular/router'
import { DataModule } from '../data/data.module';
import { ListAsignComponent } from './list-asign/list-asign.component';
import { LayoutsModule } from '../layouts/layouts.module';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client'
import { DataTablesModule } from 'angular-datatables'
import { PipesModule } from 'src/app/pipes/pipes.module';

import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    StartComponent,
    ListFilesComponent,
    ListAsignComponent
  ],
  imports: [
    DataModule,
    FormsModule,
    DataTablesModule,
    LayoutsModule,
    PipesModule,
    CollaboratorRoutingModule,
    LoadingBarHttpClientModule,
    CommonModule,
    RouterModule,
    ComponentsModule
  ]
})
export class CollaboratorModule { }
