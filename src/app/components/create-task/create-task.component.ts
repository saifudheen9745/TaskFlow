import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../tasks/task.service';
import { Store } from '@ngrx/store';
import { selectUserDetails } from 'src/app/shared/ngrx/ngrx.selectors';
import { catchError, take } from 'rxjs';
import { task } from 'src/app/config/config.types';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  regex = /^[a-zA-Z]+$/;
  userId: string;
  @Output() taskCreated:EventEmitter<task> = new EventEmitter()
  constructor(private taskService: TaskService, private store: Store) {}
  ngOnInit(): void {
    this.store
      .select(selectUserDetails)
      .pipe(take(1))
      .subscribe((data) => {
        this.userId = data.userId;
      });
  }

  createTask(formData: any) {
    this.taskService.createTask({ ...formData, userId: this.userId }).pipe(
      take(1),
      catchError((err)=>{
        throw err
      })
    ).subscribe((data)=>{
      this.taskCreated.emit(data)
    })
  }
}
