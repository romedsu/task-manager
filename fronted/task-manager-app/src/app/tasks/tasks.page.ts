import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss', '../home/home.page.scss'],
  standalone: false,
})
export class TasksPage implements OnInit {
  tasks: any[] = [];
  newTaskTitle: string = '';
  username: string | null = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.username = this.authService.getUsername();
  }
  loadTasks() {
    this.taskService.getTasksNoLogin().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  addTask() {
    if (this.newTaskTitle.trim() === '') return;
    this.taskService.addTask(this.newTaskTitle).subscribe((task) => {
      this.tasks.push(task);
      this.newTaskTitle = '';
    });
  }

  toggleTask(task: any) {
    // this.taskService.toggleTask(task._id, task.completed).subscribe();
    this.taskService.toggleTask(task._id).subscribe();
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t._id !== id);
    });
  }

  logout() {
    this.authService.logout();
  }

  ionViewWillEnter() {
    this.appComponent.titulo = 'Todas las tareas';
  }
}
