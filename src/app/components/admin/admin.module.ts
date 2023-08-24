import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminAuthGuardService } from 'src/app/shared/guards/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [AdminComponent, UserManagementComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  providers:[AdminAuthGuardService]
})
export class AdminModule { }
