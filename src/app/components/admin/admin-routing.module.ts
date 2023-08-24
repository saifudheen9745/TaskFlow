import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAuthGuardService } from 'src/app/shared/guards/admin-auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./admin-login/admin-login.module').then(
        (m) => m.AdminLoginModule
      ),
    canActivate: [AdminAuthGuardService],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
    canActivate: [AdminAuthGuardService],
  },
  {
    path:'**',
    redirectTo:'/admin/users'
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
