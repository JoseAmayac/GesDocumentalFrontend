import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
declare const AppMia:any;

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy {
  error = null;

  usuario:Observable<Usuario>;
  constructor(private service:AuthService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()
    this.usuario = this.service.getUser().pipe(
      tap(()=>{
        this.spinner.hide()
        $('body').addClass('hold-transition sidebar-mini layout-fixed ')
        AppMia.initMainPage();    
      }),
      catchError(err=>{
        this.spinner.hide()
        this.error = err
        return throwError(err)
      })
    )
    
    // AppMia.initMainPage();
  }

  ngOnDestroy(){
    $('body').removeClass('hold-transition sidebar-mini layout-fixed')
  }

} 
