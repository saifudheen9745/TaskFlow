import { Component, OnInit } from '@angular/core';
import { task } from 'src/app/config/config.types';
import { TaskService } from './task.service';
import { Store } from '@ngrx/store';
import { selectUserDetails } from 'src/app/shared/ngrx/ngrx.selectors';
import { catchError, take } from 'rxjs';
import { removeUserDetails } from 'src/app/shared/ngrx/ngrx.actions';
import { Router } from '@angular/router';
import { listAnimation } from './animations';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  animations:[listAnimation]
})
export class TasksComponent implements OnInit {
  showCreateTaskModal: boolean = false;
  showViewTaskModal:boolean = false
  selectedTask:task
  tasks: task[];
  search:''
  userId: string;
  constructor(private taskService: TaskService, private store: Store,private router:Router) {}
  ngOnInit(): void {
    this.store
      .select(selectUserDetails)
      .pipe(
        take(1),
        catchError((err) => {
          throw err;
        })
      )
      .subscribe((data) => {
        this.userId = data.userId;
      });
    this.taskService
      .getAllTask(this.userId)
      .pipe(
        take(1),
        catchError((err) => {
          throw err;
        })
      )
      .subscribe((data) => {
        this.tasks = data;
      });
  }

  handleLogout() {
    this.store.dispatch(removeUserDetails())
    localStorage.removeItem('userDetails')
    this.router.navigate(['/'])
  }

  handleModal(data: boolean,modal:string,task?:task) {
    if(modal === 'createTask'){
      this.showCreateTaskModal = data;
    }else{
      this.showViewTaskModal = data
    }

    //Passing task to the modal when clicked
    if(task){
      this.selectedTask = task
    }
  }

 
  newTask(data: task) {
    this.showCreateTaskModal = false;
    console.log(this.tasks.length)
    this.tasks.push(data);
    console.log(this.tasks.length);
  }

  updateTask(data:string){
    let updatedTask = this.tasks.find((task)=>task._id === data)
    if(updatedTask){
      updatedTask.isComplete = !updatedTask.isComplete
    }
  }

  deleteTask(data:string){
    this.tasks = this.tasks.filter((task)=>task._id !== data)
    this.showViewTaskModal = false
  }
}
