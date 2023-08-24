import { Component, EventEmitter, Input, Output } from '@angular/core';
import { task } from 'src/app/config/config.types';
import { TaskService } from '../tasks/task.service';
import { catchError, take } from 'rxjs';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent {
  @Input() task: task;
  @Output() taskUpdated: EventEmitter<string> = new EventEmitter();
  @Output() taskDeleted: EventEmitter<string> = new EventEmitter();
  constructor(private taskService: TaskService) {}

  updateTaskStatus(taskId: string, status: boolean) {
    this.taskService
      .updateTask(taskId, status)
      .pipe(
        take(1),
        catchError((err) => {
          throw err;
        })
      )
      .subscribe((data) => {
        if (data.updated) {
          this.taskUpdated.emit(this.task._id);
        }
      });
  }

  deleteTask(taskId: string) {
    this.taskService
      .deleteTask(taskId)
      .pipe(
        take(1),
        catchError((err) => {
          throw err;
        })
      )
      .subscribe((data) => {
        if (data.deleted) {
          this.taskDeleted.emit(this.task._id);
        }
      });
  }
}
