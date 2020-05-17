import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AfterauthGuard implements CanLoad {
  constructor(private service:AuthService,private router:Router){}

  canLoad(route: Route,segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean  {

    return this.service.validarAuth()
    
  }
  
}
