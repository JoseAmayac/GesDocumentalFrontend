import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivateChild {
  constructor(private service:AuthService){}


  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (next.data[1]) {
        return this.service.validarRol(next.data[0],next.data[1]);
      }
      return this.service.validarRol(next.data[0]);
  }
  
}
