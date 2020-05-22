import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Document } from 'src/app/interfaces/interfaces';
import { DocumentService } from 'src/app/services/document.service';

declare var $:any;

import Swal from 'sweetalert2'
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-table-all',
  templateUrl: './table-all.component.html',
  styleUrls: ['./table-all.component.css']
})
export class TableAllComponent implements OnInit {
  
  //Lista de documentos a mostrar en la table
  @Input() documents:Document[] = [];

  //Opciones de la tabla
  dtOptions: DataTables.Settings = {};

  //Documento que se selecciona para mostrar en detalle 
  public documentSelected:Document = null;

  @Output() actualizar = new EventEmitter();

  constructor(private service:DocumentService,private uiService:UiService) { }

  ngOnInit() {
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip({
        container: '.content-wrapper'
      })
    });
    this.dtOptions = {
      language:{
        url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
      },
      responsive:true,
      info:true,
      autoWidth:false
    };
  }

  downLoadFile(doc:Document) {
    
    this.service.getFile(doc.filePath).subscribe(
      res=>{
        this.descargar(res,doc)
      },
      err=>{
        this.uiService.mensajeError('Algo salió mal');
      }
    )
  }

  descargar(res,doc,respuesta:string = ""){
    var blob = new Blob([res], { type: "application/pdf"});
    var url = window.URL.createObjectURL(blob);
    $(document).ready(function() {
      $('a#enlace_descarga').attr('href',url);
      $('a#enlace_descarga').attr('download',respuesta + doc.name);
      document.getElementById('enlace_descarga').click()
    });
  }

  downloadResponse(doc:Document){
    this.service.downloadResponse(doc.response.filePath).subscribe(
      res=>{
        this.descargar(res,doc,'respuesta')
      },
      err=>{
        this.uiService.mensajeError('Algo salió mal');
      }
    )
  }


  definirDocumento(document:Document){
    this.documentSelected= document;
  }

  eliminar(document:Document){
    Swal.fire({
      title: 'Confirme su acción',
      text: '¿Está seguro de querer eliminar este documento? esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons:true,
      confirmButtonColor: '#EFEEEE',
      cancelButtonColor: '#17a2b8',
      customClass: {
        confirmButton:'text-dark'
      }
    }).then((result) => {
      if (result.value) {

        this.service.delete(document).subscribe(
          res=>{
            this.uiService.mensajeExitosoNeutral(res['message'])
            this.actualizar.emit(true);
          },
          err=>{
            this.uiService.mensajeError('Algo salió val');
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
  }
}
