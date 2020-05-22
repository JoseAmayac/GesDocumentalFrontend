import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Document, Respuesta } from 'src/app/interfaces/interfaces';
import { DocumentService } from 'src/app/services/document.service';
import { UiService } from 'src/app/services/ui.service';

declare var $:any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  
  //Lista de documentos a mostrar en la table
  @Input() documents:Document[] = [];

  //Opciones de la tabla
  dtOptions: DataTables.Settings = {};
  

  //Objeto de la respuesta
  respuesta:Respuesta = {};

  //Evento para refrescar la lista
  @Output() respondido = new EventEmitter<boolean>();

  constructor(private service:DocumentService, private uiService:UiService) { }

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

  definirDocumento(document:Document){
    this.respuesta.document_id = document.id;
  }

  responder(){

    let formData = new FormData();
    formData.append('description',this.respuesta.description);
    formData.append('document_id',this.respuesta.document_id);
    if (this.respuesta.file) {
      formData.append('filePath',this.respuesta.file,this.respuesta.file.name)
    }

    this.service.response(formData).subscribe(
      res=>{
        $('#staticBackdrop').modal('hide');
        this.uiService.mensajeExitoso(res['message']);
        this.respondido.emit(true);
      },
      error=>{
        this.uiService.mensajeError('Algo salió mal');
      }
    )
  }

  addFile(event){
    if (event.target.files.length > 0) {
      this.respuesta.file = event.target.files[0];
      $('#nombreArchivo').text(this.respuesta.file.name);
    }
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

}
