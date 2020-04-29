import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  selectedTask: Task;
  tasks: Task[];
  
  readonly URL_API = '/api/tasks';

  constructor(private http: HttpClient) {
    this.selectedTask = new Task();
  }

  postTask(task: Task) {
    return this.http.post(this.URL_API, task);
  }

  getTasks() {
    return this.http.get(this.URL_API);
  }

  getTask(_id: string) {
    return this.http.get(this.URL_API + `/${_id}`);
  }

  putTask(task: Task) {
    return this.http.put(this.URL_API + `/${task._id}`, task);
  }

  deleteTask(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }

}


