import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators'; 
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

    private refreshTokenInProgress = false;
    private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);

    constructor(public authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(request).pipe(
        catchError(err=>{
          const error = (typeof err.error !== 'object') ? JSON.parse(err.error) : err

          if (err.status === 401 && error.error.err === 'token_expired') {
            if (!this.refreshTokenInProgress) {
              this.refreshTokenInProgress = true;
              this.refreshTokenSubject.next(null);
              return this.authService.requestAccessToken().pipe(
                  switchMap((authResponse) => {
                      
                      this.authService.guardarToken(authResponse['access_token']);
                      this.authService.cargarToken()
                      this.refreshTokenInProgress = false;
                      this.refreshTokenSubject.next(authResponse['access_token']);
                      return next.handle(this.injectToken(request));
                  }),
                  catchError((e)=>{
                    this.refreshTokenInProgress = false;
                    this.authService.logoutAlternative(true)
                    // return throwError(e)
                    return next.handle(this.injectToken(request))
                  })
              );
            } else {
                return this.refreshTokenSubject.pipe(
                    filter(result => result !== null),
                    take(1),
                    switchMap((res) => {
                        return next.handle(this.injectToken(request))
                    })
                );
            }
          }else{
            if (err.status === 401 && error.error.err === 'token_invalid') {
              this.authService.logoutAlternative(false);
              return next.handle(this.injectToken(request))
              // return throwError(err)
            }
          }

          return throwError(err)
        })
      )
    }

    injectToken(request: HttpRequest<any>) {
      const token =  localStorage.getItem('token')
      
      return request.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`
          }
      });
    }
  
}
