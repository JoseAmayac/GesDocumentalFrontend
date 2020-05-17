import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UserService } from 'src/app/services/user.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UiService } from 'src/app/services/ui.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  usuarios:Observable<Usuario[]>;
  errorObject = null;

  
  constructor(private userService:UserService, private uiService:UiService) { }

  

  ngOnInit() {
    
    this.getUsers()
  }

  eliminar(usuario:Usuario){
    Swal.fire({
      title: 'Confirme su acción',
      text: '¿Está seguro de querer eliminar al usuario? esta acción no se puede deshacer',
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
        this.userService.delete(usuario).subscribe(
          res=>{
            this.uiService.mensajeExitosoNeutral(res['message']);
            this.getUsers()
          },
          error=>{
            this.uiService.mensajeError('Algo salió mal');
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })
    
  }

  ngOnDestroy() {
    // $('body').removeClass('hold-transition sidebar-mini')
  }

  getUsers(){
    this.usuarios = this.userService.getUsers().pipe(
      catchError(err=>{
        
        this.errorObject = err;
        
        return throwError(err)
      })
    )
  }

}
