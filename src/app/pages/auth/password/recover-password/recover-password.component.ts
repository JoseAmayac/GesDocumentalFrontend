import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from 'src/app/services/password.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  token:string;

  data = {
    email:'',
    password:'',
    token:'',
    password_confirmation:''
  };

  error = {
    email:null,
    password:null,
    token:null
  };

  constructor(private route:ActivatedRoute,
              private service:PasswordService,
              private authService:AuthService,
              private router:Router,
              private spinner:NgxSpinnerService,
              private toast:ToastrService
              ) {
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit() {
    $('body').addClass('hold-transition login-page')
  }
  
  ngOnDestroy() {
    $('body').removeClass('hold-transition login-page')
  }

  recoverPassword(){
    this.spinner.show();
    this.service.findUser(this.token).subscribe(
      res=>{
        this.changePassword(res)
      },
      error=>{
        this.spinner.hide()
        this.toast.error(error['error'].message,'Ups!',{
          positionClass:'toast-top-center',
          closeButton:true,
          timeOut:6000,
        })
      }
    )
    
  }

  changePassword(res:any){
    this.data.email = res.email;
    this.data.token = this.token;

    this.service.changePassword(this.data).subscribe(
      res=>{
        let usuario = {
          email: res['email'],
          password: this.data.password
        };
        this.authService.login(usuario).subscribe(
          async res=>{
            this.spinner.hide()
            await this.authService.guardarToken(res['access_token'])
            this.router.navigateByUrl('/dashboard')
            this.toast.success('La contraseña ha sido cambiada correctamente','Hecho!',{
              timeOut:5000,
              closeButton:false
            });
          },
          error=>{
            this.spinner.hide()
            this.toast.error(error['error'].message,'Ups!',{
              positionClass:'toast-top-center',
              closeButton:true,
              timeOut:6000,
            })
            this.router.navigateByUrl('/auth')
          }
        )
      },
      error=>{
        this.spinner.hide()
        if (error['status'] === 404) {
          this.toast.error(error['error'].message,'Ups!',{
            positionClass:'toast-top-center',
            closeButton:true,
            timeOut:6000,
          })
        } else {
          if (error['status'] === 422) {
            this.error = error['error'].errors;
          } else {
            
          }
        } 
      }
    )
  }
}
