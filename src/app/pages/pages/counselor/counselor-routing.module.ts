import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RolGuard } from 'src/app/guards/rol.guard';

const routes: Routes = [
    {
        path:'',
        component:PrincipalComponent,
        data:['orientador'],
        canActivateChild:[RolGuard],
        children:[
            {
                path:'',
                component: WelcomeComponent
            }
        ]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CounselorRoutingModule { }