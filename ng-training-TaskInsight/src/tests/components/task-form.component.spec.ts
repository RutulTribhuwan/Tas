import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from '../../app/task-form/task-form.component';
import { TaskService } from '../../app/services/task.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EMPTY, of } from 'rxjs';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['addTask']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TaskFormComponent],
      providers: [{ provide: TaskService, useValue: taskServiceSpy }]
    });

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should create a task when form is valid', () => {
    component.taskForm.setValue({
      assignedTo: 'Alice',
      status: 'Pending',
      dueDate: '2024-09-30',
      priority: 'High',
      description: 'Complete project'
    });

    taskService.addTask.and.returnValue(EMPTY);

    component.onSubmit();

    expect(taskService.addTask).toHaveBeenCalled();
    expect(component.taskForm.valid).toBe(true);
  });
});
