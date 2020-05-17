import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy, AfterViewInit {
  loginUser = {
    email:'',
    password:''
  };

  error:string = '';
  incorrecto:boolean = false;

  constructor(private service:AuthService,private router:Router,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.hide()
  }
  
  ngAfterViewInit() {
    $('body').addClass('hold-transition login-page');
  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page'); 
  }

  async login(){
    this.spinner.show();
    this.incorrecto = false;
    this.service.login(this.loginUser).subscribe(
      res=>this.procesarCorrecto(res),
      error=>this.procesarError(error)
    );
  }

  async procesarCorrecto(data:any){
    await this.service.guardarToken(data.access_token); 
    
    if (data.user.role.name === 'administrador') {
      this.router.navigateByUrl('/dashboard');
    } else {
      if (data.user.role.name === 'orientador') {
        this.router.navigateByUrl('/counselor');  
      } else {
        this.router.navigateByUrl('/list');
      }
      
    }

    this.spinner.hide();
    
  }

  procesarError(error:any){
    this.spinner.hide();
    this.loginUser.password = "";
    this.error = error.error.error;
    this.incorrecto = true;

    setTimeout(() => {
      $('div.alert-danger').fadeOut('slow');
    }, 5000);
  }
}
