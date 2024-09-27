import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      assignedTo: ['', Validators.required],
      status: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      this.taskService.addTask(task).subscribe(() => {
        console.log('Task added successfully!');
        this.taskForm.reset();
      });
    }
  }
}
