import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  Obsusuario:Observable<Usuario>;
  errorObject = null;

  constructor(private authservice:AuthService) { }

  ngOnInit() {
    this.Obsusuario = this.authservice.getUser().pipe(
      catchError(err=>{
        this.errorObject = err;
        return throwError(err)
      })
    )
  }

}
