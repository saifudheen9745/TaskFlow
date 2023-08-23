import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';




@NgModule({
  declarations: [AdminComponent, UserManagementComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
  
})
export class AdminModule { }
