import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { DataTablesModule } from 'angular-datatables'

import { FormsModule } from '@angular/forms';
import { TableAllComponent } from './table-all/table-all.component'

@NgModule({
  declarations: [
    TableComponent,
    TableAllComponent
  ],
  imports: [
    DataTablesModule,
    FormsModule,
    CommonModule
  ],
  exports:[
    TableComponent,
    TableAllComponent
  ]
})
export class DataModule { }
