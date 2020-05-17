import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { DataTablesModule } from 'angular-datatables'

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    DataTablesModule,
    CommonModule
  ],
  exports:[
    TableComponent
  ]
})
export class DataModule { }
