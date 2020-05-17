import { Component, OnInit, Input } from '@angular/core';
import { Document } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  @Input() documents:Document[] = [];

  dtOptions: DataTables.Settings = {};
  
  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
      },
      responsive:true,
      info:true,
      autoWidth:false
    };
  }

}
