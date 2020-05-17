import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthcheckGuard } from './guards/authcheck.guard';
import { AfterauthGuard } from './guards/afterauth.guard';


const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    canLoad:[AfterauthGuard]
  },
  {
    path:'dashboard',
    loadChildren: () => import('./pages/pages/admin/pages.module').then(m => m.PagesModule),
    canLoad:[AuthcheckGuard],
  },
  {
    path: 'reset',
    loadChildren: () => import('./pages/auth/password/password.module').then(m => m.PasswordModule),
    canLoad:[AfterauthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/pages/collaborator/collaborator.module').then(m => m.CollaboratorModule),
    canLoad: [AuthcheckGuard]
  },
  {
    path: 'counselor',
    loadChildren: () => import('./pages/pages/counselor/counselor.module').then( m => m.CounselorModule),
    canLoad: [AuthcheckGuard]
  },
  {
    path: '*.*',
    redirectTo: '/dashboard'
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
