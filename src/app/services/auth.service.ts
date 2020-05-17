import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Usuario, Role } from '../interfaces/interfaces';
import { UiService } from './ui.service';
import { map, tap } from 'rxjs/operators';
const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  token:string = null;
  usuario:Usuario = null;

  constructor(private http:HttpClient,private router:Router, private toast:ToastrService, private uiService:UiService) {
  }

  checkRoleArchivo(){
    if (!this.usuario) {
      this.validarToken()
    } else {
      if (this.usuario.role.name === 'archivo') {
        return true;
      } else {
        return false;
      }
    }
  }

  login(usuario){
    return this.http.post(`${url}/login`,usuario);
  }

  async guardarToken(token:string){
    await localStorage.setItem('token',token);

    // await this.validarToken();
  }

  async cargarToken(){
    return this.token = await localStorage.getItem('token') || null;
  }

  async validarToken():Promise<boolean>{
    await this.cargarToken();

    return new Promise<boolean>(resolve=>{
      if (!this.token) {
        this.router.navigateByUrl('/auth')
        resolve(false);
      } else {
        resolve(true)
      }
    })
  }


  async validarRol(rol:string,rolAlterno?:string){
    return new Promise<boolean>(resolve=>{
      this.getUser().subscribe(
        res=>{
          this.usuario = res;
          if (res.role.name === rol || res.role.name === rolAlterno) {
            resolve(true)
          } else {
            switch (res.role.name) {
              case 'administrador':
                this.router.navigateByUrl('/dashboard')
                resolve(false)
                break;
              case 'orientador':
                this.router.navigateByUrl('/counselor')
                resolve(false)
                break;
              case 'archivo':
                this.router.navigateByUrl('/list')
                resolve(false)
                break;
              case 'usuario':
                this.router.navigateByUrl('/list')
                resolve(false)
                break;
            }
          }
        }
      )
    })
  }

  getRoles(){
    return this.http.get<Role[]>(`${url}/roles`);
  }

  async validarAuth():Promise<boolean>{
    await this.cargarToken()
    return new Promise<boolean>(resolve=>{
      if(!this.token){
        resolve(true)
      }else{
        this.router.navigateByUrl('/dashboard');
        resolve(false)
      }
    })
  }
  
  async logout(){

    await this.cargarToken()

    this.http.get(`${url}/logout`).subscribe(
      async res=>{
        this.toast.success(res['message'],'Sesión cerrada',{
          closeButton:false,
          timeOut:3000,
          positionClass:'toast-top-center'
        });
        this.token = null;
        this.usuario = null;
        await localStorage.clear();
        this.router.navigateByUrl('/auth')
        
      },
      async error=>{
        this.token = null;
        this.usuario = null;
        await localStorage.clear()
        this.router.navigateByUrl('/auth')
      }
    )
  }

  getUser(){
    return this.http.get<Usuario>(`${url}/me`);
  }

  setUser(usuario){
    this.usuario = usuario;
  }

  requestAccessToken() {
    return this.http.get(`${url}/refresh`);
  }

  async logoutAlternative(acabada:boolean){
    await this.cargarToken();
    this.token = null;
    this.usuario = null;
    await localStorage.clear()
    if (acabada) {
      this.uiService.mostrarSesionAcabada('Tú sesión ha caducado, vuelve a iniciar sesión para continuar')
    } else {
      this.uiService.mostrarSesionAcabada('Algo salió mal con tu sesión actual, por favor ingresa nuevamente')
      
    }
    this.router.navigateByUrl('/auth')
  }
}
