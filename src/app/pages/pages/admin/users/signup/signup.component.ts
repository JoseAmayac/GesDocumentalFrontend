import { Component, OnInit } from '@angular/core';
import { Usuario, Dependency, Role, errorUsuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { DependenciesService } from 'src/app/services/dependencies.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usuario: Usuario = {};
  dependencies: Observable<Dependency[]>;
  roles: Observable<Role[]>;

  orientador:boolean = false;

  patron = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  errorObject = null;

  errorUsuario:errorUsuario = {};

  constructor(private authService:AuthService,
              private userService:UserService,
              private dependencyService:DependenciesService,
              private uiService:UiService,
              private router:Router) { }

  ngOnInit() {
    $('.content-wrapper').addClass('cubierta1');
    $('.content-wrapper').addClass('fondo');
    
    $('.select2').select2()

    this.dependencies = this.dependencyService.getDependencies().pipe(
      catchError(err=>{
        this.errorObject = err;
        return throwError(err)
      })
    )

    this.roles = this.authService.getRoles().pipe(
      catchError(err=>{
        this.errorObject = err;
        return throwError(err)
      })
    )

  }

  ngOnDestroy() {
    $('.content-wrapper').removeClass('cubierta1');
  }

  register(){
    this.userService.create(this.usuario).subscribe(
      res=>this.handleCorrectResponse(res),
      error=>this.handleErrorResponse(error)
    )
  }

  handleCorrectResponse(res){
    this.router.navigateByUrl('/dashboard/users');
    this.uiService.mensajeExitoso(res.message)
  } 

  handleErrorResponse(error){
    if (error.status === 422) {
      this.errorUsuario = error.error.errors;
    }else{
      this.uiService.mensajeError('Algo salió mal');
    }
  }

  verificarOpcion(event){
    if (event.target.value == 2) {
      this.orientador = true;
    }else{
      this.orientador = false;
    }
  }
}
