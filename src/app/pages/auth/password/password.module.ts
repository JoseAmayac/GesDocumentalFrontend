import { PasswordRoutingModule } from './password-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

import { FormsModule } from '@angular/forms/';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';


@NgModule({
  declarations: [ForgotPasswordComponent, RecoverPasswordComponent],
  imports: [
    CommonModule,
    PasswordRoutingModule,
    FormsModule
  ]
})
export class PasswordModule { }
