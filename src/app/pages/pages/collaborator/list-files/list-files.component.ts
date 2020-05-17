import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {

  documents:Observable<Document[]>;
  errorObject = null;

  constructor(private service:DocumentService) { }

  ngOnInit() {
    this.documents = this.service.getForDependency().pipe(
      catchError(err=>{
        this.errorObject = err
        console.log(this.errorObject);
        
        return throwError(err)
      })
    )
  }

}
