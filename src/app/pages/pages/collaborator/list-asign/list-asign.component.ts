import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-asign',
  templateUrl: './list-asign.component.html',
  styleUrls: ['./list-asign.component.css']
})
export class ListAsignComponent implements OnInit {

  documents:Observable<Document[]>;
  errorObject = null;
  dtOptions: DataTables.Settings = {};

  constructor(private service:DocumentService) { }

  ngOnInit() {
    this.dtOptions = {
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
      },
      responsive:true,
      info:true,
      autoWidth:false
    };
    this.documents = this.service.getToAsign().pipe(
      catchError(err=>{
        this.errorObject = err;
        return throwError(err)      
      })
    )
  }

}
