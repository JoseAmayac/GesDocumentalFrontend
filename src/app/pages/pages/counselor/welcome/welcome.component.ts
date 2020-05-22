import { Component, OnInit, ViewChild, } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import Swal from 'sweetalert2';
import { UiService } from 'src/app/services/ui.service';

declare var $:any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  file:File;
  @ViewChild('fnew',{static:false}) form;

  archivo:any = {
    name:null,
    description:null,
    file:null
  };

  constructor(private documentService:DocumentService,private uiService:UiService) { }

  ngOnInit() {
  }

  uploadFile(){
    const formData = new FormData();
    formData.append('name',this.archivo.name);
    formData.append('description',this.archivo.description);
    formData.append('file',this.file,this.file.name);

    this.documentService.uploadFile(formData).subscribe(
      res=>{
        this.handleCorrectResponse(res)
      },
      error=>{
        this.handleErrorResponse(error)
      } 
    )

  }

  handleCorrectResponse(res:any){
    Swal.fire({
      title: res.message,
      text:'El documento se ha subido, ahora puedes descargar el comprobante de recibido',
      icon: 'success',
      showCancelButton:false,
      showConfirmButton:true,
      backdrop:true,
      allowOutsideClick:false,
      confirmButtonText:'<h5 class="d-inline mr-2">Descargar</h5> <i class="fa fa-download"></i>'
    }).then((result)=>{
      if (result.value) {
        this.documentService.downloadVoucher(res.id).subscribe(
          res=>{
            this.form.reset();
            this.file = null;
            $('#nombreArchivo').text("Documento escaneado(PDF)");
            this.downLoadFile(res,"application/pdf");
          },
          err=>{
            console.log(err);
          } 
        )
      }
    })
  }

  handleErrorResponse(error:any){
    if(error.status === 422){

    }else{
      this.uiService.mensajeError('Algo salió mal');
    }
  }

  addFile(event){
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      $('#nombreArchivo').text(this.file.name);
    }
  }

downLoadFile(data: any, type: string) {
    var blob = new Blob([data], { type: type});
    
    var url = window.URL.createObjectURL(blob);

    $(document).ready(function() {
      $('a#enlace_descarga').attr('href',url);
      document.getElementById('enlace_descarga').click()
      // $('a#enlace_descarga').trigger('click');
    });

    // var pwa = window.open(url,'_blank');
    
    // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
    //     alert( 'Please disable your Pop-up blocker and try again.');
    // }
}
}
