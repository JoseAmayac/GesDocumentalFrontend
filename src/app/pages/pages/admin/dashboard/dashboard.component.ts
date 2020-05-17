import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralInformation } from 'src/app/interfaces/interfaces';
import { GeneralService } from 'src/app/services/general.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public information:Observable<GeneralInformation>;
  errorObject = null;

  constructor(private generalService:GeneralService) { }

  ngOnInit() {
    this.information = this.generalService.getInfo().pipe(
      catchError(err=>{
        this.errorObject = err
        return throwError(err)
      })
    )
  }

}
