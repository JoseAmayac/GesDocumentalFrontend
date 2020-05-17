import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private toast:ToastrService) { }

  mostrarSesionAcabada(mensaje:string){
    this.toast.info(mensaje,'Sesión caducada',
    {
      timeOut:5000,
    })
  }

  mensajeExitoso(mensaje:string){
    this.toast.success(mensaje,'Hecho!',{
      timeOut: 4000
    })
  }

  mensajeError(mensaje:string){
    this.toast.error(mensaje,'Ups!',{
      timeOut: 5000
    })
  }

  mensajeExitosoNeutral(mensaje:string){
    this.toast.info(mensaje,'Hecho!',{
      timeOut: 4000
    })
  }
}
