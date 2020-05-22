import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Document } from 'src/app/interfaces/interfaces';
import { DocumentService } from 'src/app/services/document.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.css']
})
export class AllDocumentsComponent implements OnInit {
  documents: Observable<Document[]>;
  errorObject = null;

  constructor(private service:DocumentService) { }

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.documents = this.service.getAllDocumets().pipe(
      catchError(err=>{
        this.errorObject = err
        return throwError(err)
      })
    )
  }

  refreshData(event){
    if (event) {
      this.getData()
    }
  }

}
