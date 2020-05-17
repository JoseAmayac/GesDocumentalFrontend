import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import { Observable } from 'rxjs';

declare var $:any;

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  @Input() usuario:Usuario;


  constructor(private service:AuthService, private router:Router) { }

  ngOnInit() {
    
    
  }

  async logout(){
    await this.service.logout();
  }
}
