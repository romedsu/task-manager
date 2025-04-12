import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  username: string | null = '';
  activeButton: string | null = null;

 


  // private authService: AuthService
  // constructor(private taskService: TaskService) {}
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private appComponent: AppComponent,
  ) {}


  ngOnInit() {
    this.loadTasks();
    this.username = this.authService.getUsername();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    this.taskService.addTask(this.newTaskTitle).subscribe((task) => {
      this.tasks.push(task);
      this.newTaskTitle = '';
    });
  }

  toggleTask(task: Task) {
    this.taskService.toggleTask(task._id!).subscribe((updatedTask) => {
      task.completed = updatedTask.completed;
    });
  }

  deleteTask(task: Task) {
    console.log(`Borrar id: ${task._id}`);

    this.taskService.deleteTask(task._id!).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t._id !== task._id);
    });
  }
  logout() {
    this.authService.logout();
  }


  ionViewWillEnter(){
    this.appComponent.titulo= 'Mis tareas';
  }



  
}
