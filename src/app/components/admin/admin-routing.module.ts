import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./admin-login/admin-login.module').then(
        (m) => m.AdminLoginModule
      ),
  },
  {
    path:'users',
    loadChildren:()=>import('./user-management/user-management.module').then((m)=>m.UserManagementModule)
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
