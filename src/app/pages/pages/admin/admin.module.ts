import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { SignupComponent } from './users/signup/signup.component';

import { DataTablesModule } from 'angular-datatables'
import { RouterModule } from '@angular/router';
import { ListComponent } from './dependencies/list/list.component';
import { NewDependencyComponent } from './dependencies/new-dependency/new-dependency.component'

import { FormsModule } from '@angular/forms'
import { AllDocumentsComponent } from './documents/all-documents/all-documents.component';
import { MyDocumentsComponent } from './documents/my-documents/my-documents.component';
import { DataModule } from '../data/data.module';
@NgModule({
  declarations: [
    DashboardComponent,
    AllDocumentsComponent,
    MyDocumentsComponent,
    UserListComponent,
    ListComponent,
    NewDependencyComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DataModule,
    RouterModule,
    ComponentsModule,
    DataTablesModule
  ],
  exports:[
    DashboardComponent,
    UserListComponent
  ]
})
export class AdminModule { }
