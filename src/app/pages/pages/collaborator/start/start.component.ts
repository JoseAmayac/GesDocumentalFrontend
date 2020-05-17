import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  ObsUsuario: Observable<Usuario>;
  errorObject = null;

  constructor(private service:AuthService) { }

  ngOnInit() {
    this.ObsUsuario = this.service.getUser().pipe(
      catchError(err=>{
        this.errorObject = err;
        return throwError(err)
      })
    )
  }

}
