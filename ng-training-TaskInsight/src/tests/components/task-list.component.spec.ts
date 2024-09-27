import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from '../../app/task-list/task-list.component';
import { TaskService } from '../../app/services/task.service';
import { EMPTY, of } from 'rxjs';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask']);

    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });

  it('should load tasks on init', () => {
    const mockTasks = [{ id: 1, assignedTo: 'Alice', status: 'Pending', dueDate: '2024-09-30', priority: 'High', description: 'Complete project' }];
    taskService.getTasks.and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(component.tasks.length).toBe(1);
    expect(component.tasks).toEqual(mockTasks);
  });

  it('should delete a task', () => {
    const mockTasks = [{ id: 1, assignedTo: 'Alice', status: 'Pending', dueDate: '2024-09-30', priority: 'High', description: 'Complete project' }];
    component.tasks = mockTasks;

    taskService.deleteTask.and.returnValue(EMPTY);

    component.deleteTask(1);

    expect(component.tasks.length).toBe(0);
  });
});
