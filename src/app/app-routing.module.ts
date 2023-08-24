import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuardService } from './shared/guards/user-auth-guard.service';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path:'error',
    loadChildren:()=>import('./components/error-page/error-page.module').then((m)=>m.ErrorPageModule)
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./components/register/register.module').then(
        (m) => m.RegisterModule
      ),
    canActivate: [UserAuthGuardService],
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
    canActivate: [UserAuthGuardService],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/tasks/tasks.module').then((m) => m.TasksModule),
    canActivate: [UserAuthGuardService],
  },
  {
    path:'**',
    redirectTo:'/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
