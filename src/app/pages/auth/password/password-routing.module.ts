import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterauthGuard } from 'src/app/guards/afterauth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

const routes: Routes = [
    {
      path:'',
      component:ForgotPasswordComponent
    },
    {
      path:'recover/:token',
      component:RecoverPasswordComponent
    }
];
  
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})


export class PasswordRoutingModule { }