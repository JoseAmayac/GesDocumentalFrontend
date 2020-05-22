import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Document, Dependency } from 'src/app/interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { DocumentService } from 'src/app/services/document.service';
import { catchError, tap } from 'rxjs/operators';
import { DependenciesService } from 'src/app/services/dependencies.service';
import { UiService } from 'src/app/services/ui.service';

declare var $:any;


@Component({
  selector: 'app-list-asign',
  templateUrl: './list-asign.component.html',
  styleUrls: ['./list-asign.component.css']
})
export class ListAsignComponent implements OnInit {

  //Lista de documentos en espera de asignacion de dependencia
  documents:Observable<Document[]>;

  //Error relacionado con la carga de documentos
  errorObject = null;

  //Opciones de la tabla
  dtOptions: DataTables.Settings = {};

  //Lista de dependencias disponibles para asignar
  dependencias:Observable<Dependency[]>;

  //Error en la carga de dependencias
  errorDependencies = null;

  //Dependencia que se escoge en la lista
  dependency_id:number;

  //Error a la hora de asignar la dependencia
  errorAsignandoDependencia = null;

  //Documento seleccionado para asignar la dependencia 
  documentoSeleccionado:Document = {};


  constructor(private service:DocumentService, 
              private dependencyService:DependenciesService,
              private uiService:UiService) { }

  ngOnInit() {
    this.dtOptions = {
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
      },
      responsive:true,
      info:true,
      autoWidth:false
    };
    this.getDocuments()
  }


  getDocuments(){
    this.documents = this.service.getToAsign().pipe(
      catchError(err=>{
        this.errorObject = err;
        return throwError(err)      
      })
    )
  }

  getDependencies(documento:Document){
    this.documentoSeleccionado = documento;
    this.dependencias = this.dependencyService.getDependencies().pipe(
      catchError(err=>{
        this.errorDependencies = err
        return throwError(err)
      })
    )
  }

  downLoadFile(doc:Document) {
    
    this.service.getFile(doc.filePath).subscribe(
      res=>{
        var blob = new Blob([res], { type: "application/pdf"});
        var url = window.URL.createObjectURL(blob);
        $(document).ready(function() {
          $('a#enlace_descarga').attr('href',url);
          $('a#enlace_descarga').attr('download',doc.name);
          document.getElementById('enlace_descarga').click()
          // $('a#enlace_descarga').trigger('click');
        });
      }
    )
  }


  asignDependency(){
    this.service.asignDependency(this.dependency_id,this.documentoSeleccionado.id).subscribe(
      res=>{
        $('#staticBackdrop').modal('hide');
        this.getDocuments();
        this.uiService.mensajeExitoso(res['message'])
      },
      error=>{
        this.uiService.mensajeError('Algo salió mal');
      }
    )
  }
}
