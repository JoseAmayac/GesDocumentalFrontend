import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthcheckGuard implements CanLoad {
  constructor(private service:AuthService,private router:Router){}
  canLoad(route: Route,segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean  {
    return this.service.validarToken()
    
  }
}
