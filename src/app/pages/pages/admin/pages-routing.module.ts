import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './start/start.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './users/signup/signup.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ListComponent } from './dependencies/list/list.component';
import { NewDependencyComponent } from './dependencies/new-dependency/new-dependency.component';
import { RolGuard } from 'src/app/guards/rol.guard';

const routes: Routes = [
    {
      path:'',
      component:StartComponent,
      data:['administrador'],
      canActivateChild:[RolGuard],
      children:[
        {
          path:'',
          component:DashboardComponent,
          data:['administrador'],
        },
        {
          path:'signup',
          component:SignupComponent,
          data:['administrador'],
        },
        {
          path:'users',
          component:UserListComponent,
          data:['administrador'],
        },
        {
          path:'dependencies',
          data:['administrador'],
          children:[
            {
              path: '',
              component:ListComponent,
              data:['administrador'],
            },
            {
              path: 'add',
              component: NewDependencyComponent,
              data:['administrador'],
            }
          ]
          
        }
      ],
      
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }