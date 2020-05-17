import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() usuario:Usuario;
  
  constructor(private authservice:AuthService) { }

  ngOnInit() {
    
  }

  logout(){
    this.authservice.logout()
  }

}
