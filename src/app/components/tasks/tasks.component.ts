import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/models/task';

declare var M: any;


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(public taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  addTask(form?: NgForm) {
    console.log(form.value);
    if(form.value._id) {
      this.taskService.putTask(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getTasks();
          M.toast({html: 'Updated Successfully'});
        });
    } else {
      this.taskService.postTask(form.value)
      .subscribe(res => {
        this.getTasks();
        this.resetForm(form);
        M.toast({html: 'Save successfully'});
      });
    }
    
  }

  getTasks() {
    this.taskService.getTasks()
      .subscribe(res => {
        this.taskService.tasks = res as Task[];
      });
  }

  editTask(task: Task) {
    this.taskService.selectedTask = task;
  }

  deleteTask(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.taskService.deleteTask(_id)
        .subscribe(res => {
          this.getTasks();
          this.resetForm(form);
          M.toast({html: 'Deleted Succesfully'});
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.taskService.selectedTask = new Task();
    }
  }
}
