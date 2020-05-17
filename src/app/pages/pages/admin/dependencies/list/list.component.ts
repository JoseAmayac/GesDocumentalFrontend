import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Dependency } from 'src/app/interfaces/interfaces';
import { DependenciesService } from 'src/app/services/dependencies.service';
import { catchError } from 'rxjs/operators';
import { UiService } from 'src/app/services/ui.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public dependencies: Observable<Dependency[]>;
  errorObject = null;

  constructor(private dependencyService:DependenciesService, 
              private uiService:UiService) { }

  ngOnInit() {
    this.getDependencies()
  }

  eliminar(dependency:Dependency){
    Swal.fire({
      title: 'Confirme su acción',
      text: '¿Está seguro de querer eliminar esta dependencia? esta acción no se puede deshacer',
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
        this.dependencyService.deleteDependency(dependency).subscribe(
          res=>{
            this.uiService.mensajeExitosoNeutral(res['message'])
            this.getDependencies()
          },
          error=>{
            this.uiService.mensajeError('Algo salió val');
          }
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    })

    
  }

  getDependencies(){
    this.dependencies = this.dependencyService.getDependencies().pipe(
      catchError(err=>{
        this.errorObject = err;
        return throwError(err)
      })
    )
  }
}
