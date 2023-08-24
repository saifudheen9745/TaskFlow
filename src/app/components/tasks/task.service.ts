import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { task, taskCreationData } from 'src/app/config/config.types';
import { environment } from 'src/app/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  userId: string;
  constructor(private http: HttpClient) {}

  createTask(taskDetails: taskCreationData): Observable<task> {
    return this.http.post<task>(
      `${environment.baseUrl}/task/create`,
      taskDetails
    );
  }

  getAllTask(userId: string): Observable<task[]> {
    return this.http.get<task[]>(`${environment.baseUrl}/task/${userId}`);
  }

  updateTask(
    taskId: string,
    status: boolean
  ): Observable<{ updated: boolean }> {
    return this.http.patch<{ updated: boolean }>(
      `${environment.baseUrl}/task/update`,
      { taskId, status }
    );
  }

  deleteTask(
    taskId: string
  ): Observable<{ deleted: boolean }> {
    return this.http.delete<{ deleted: boolean }>(
      `${environment.baseUrl}/task/delete/${taskId}`
    );
  }
}
