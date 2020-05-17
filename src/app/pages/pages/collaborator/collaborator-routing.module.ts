import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolGuard } from 'src/app/guards/rol.guard';
import { StartComponent } from './start/start.component';
import { ListFilesComponent } from './list-files/list-files.component';
import { ListAsignComponent } from './list-asign/list-asign.component';
import { RoleAGuard } from 'src/app/guards/role-a.guard';

const routes: Routes = [
    {
        path:'',
        component:StartComponent,
        canActivateChild:[RolGuard],
        children:[
            {
              path:'',
              data:['archivo','usuario'],
              component: ListFilesComponent
            },
            {
              path:'news',
              data:['archivo'],
              component: ListAsignComponent,
              canActivate:[RoleAGuard]
            }
        ]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CollaboratorRoutingModule { }