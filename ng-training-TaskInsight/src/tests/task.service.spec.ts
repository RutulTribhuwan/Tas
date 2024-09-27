import { TaskService } from '../app/services/task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task } from '../app/models/task.model';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve tasks from the API', () => {
    const mockTasks: Task[] = [
      { id: 1, assignedTo: 'Alice', status: 'Pending', dueDate: '2024-09-30', priority: 'High', description: 'Complete project' }
    ];

    service.getTasks().subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
