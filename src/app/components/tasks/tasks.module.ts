import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { FormsModule } from '@angular/forms';
import { PatternValidationDirective } from 'src/app/shared/directives/custom-validation.directive';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

const routes: Routes = [{ path: '', component: TasksComponent }];

@NgModule({
  declarations: [
    TasksComponent,
    CustomModalComponent,
    CreateTaskComponent,
    PatternValidationDirective,
    ViewTaskComponent,
    FilterPipe
  ],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class TasksModule {}
