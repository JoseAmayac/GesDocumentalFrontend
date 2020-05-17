import { Component, OnInit, OnDestroy } from '@angular/core';
import { PasswordService } from 'src/app/services/password.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  email:string = "";

  patron = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  
  constructor(private service:PasswordService,
              private toast:ToastrService, 
              private spinner:NgxSpinnerService,
              private router:Router
              ) { }

  ngOnInit() {
    $('body').addClass('hold-transition login-page')
  }
  
  ngOnDestroy() {
    $('body').removeClass('hold-transition login-page')
  }

  resetPassword(){
    this.spinner.show();
    this.service.resetPassword(this.email).subscribe(
      res=>{
        this.spinner.hide()
        this.router.navigateByUrl('/auth');
        this.toast.success(res['message'],'Correo enviado',{
          closeButton:false,
          timeOut:6000,
        })

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
          this.spinner.hide()
          this.toast.error('Algo salió mal','Ups!',{
            positionClass:'toast-top-center',
            closeButton:true,
            timeOut:6000
          })
        }
        
      }
    )
  }

}
