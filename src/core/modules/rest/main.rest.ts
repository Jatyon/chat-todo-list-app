import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TaskCreate } from '@modules/board/models/task-create.model';
import { Task } from '@modules/board/models/task.model';
import { Observable } from 'rxjs';

@Injectable()
export class MainRest {
  constructor(private readonly httpClient: HttpClient) {}

  path: string = environment.host;

  createBoard(name: string, members: string[]): Observable<any> {
    const data: { name: string; members?: string[] } = { name, members };
    if (members.length !== 0) data.members = members;

    return this.httpClient.post(`${this.path}/board`, data);
  }

  getBoards(): Observable<any> {
    return this.httpClient.get(`${this.path}/board`);
  }

  getTasks(id: number): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.path}/task/${id}`);
  }

  addTasks(title: string, category: string, description: string, done: boolean, boardId: number): Observable<Task> {
    const task: TaskCreate = { title, description, done, category, boardId };
    return this.httpClient.post<Task>(`${this.path}/task`, task);
  }
  updateTask(id: number, task: Partial<Task>): Observable<Task> {
    return this.httpClient.patch<Task>(`${this.path}/task/${id}`, task);
  }

  doneTask(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.path}/task/done/${id}`);
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.path}/task/${id}`);
  }
}
