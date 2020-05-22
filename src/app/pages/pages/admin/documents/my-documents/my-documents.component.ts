import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/interfaces/interfaces';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css']
})
export class MyDocumentsComponent implements OnInit {

  documents: Observable<Usuario[]>;
  errorObject = null;

  constructor(private service:DocumentService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.documents = this.service.getForDependency().pipe(
      catchError(err=>{
        this.errorObject = err;
        return throwError(err)
      })
    )
  }

  actualizarTabla(event)
  {
    if (event) {
      this.getData()
    }
  }
}
