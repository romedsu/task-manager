import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { FeedbackService } from '../services/feedback.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  username: string | null = '';
  activeButton: string | null = null;

  titulo: string = '';
  subtitulo: string = '';

  userId: string | null = '';

  editable: boolean = false;
  likeActive: boolean = false;

  //  CALENDARIO
  calendario: boolean = false;
  newFechaFin: string | null = null;
  @ViewChild('calendarioID', { static: false }) calendarioID!: ElementRef;

  // private authService: AuthService
  // constructor(private taskService: TaskService) {}
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private appComponent: AppComponent,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {
    this.username = this.authService.getUsername();
    this.userId = this.authService.getUserId();

    if (this.router.url === '/home') {
      this.loadTasks();
    } else if (this.router.url === '/tasks') {
      this.loadAllTasks();
    } else if (this.router.url === '/completed') {
      this.loadCompleted();
    } else if (this.router.url === '/liked') {
      this.loadLiked();
    }

    this.router.events.subscribe(() => {
      this.setTitulo();
    });
  }

  // loadTasks() {
  //   this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));

  // }

  //Método para tareas de usuario logueado (en task.service)
  // loadTasks() {
  //   this.taskService.getTasks().subscribe((tasks) => {
  //     this.tasks = tasks.sort((a, b) => {
  //       return (
  //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //       );
  //     });
  //     this.autorToTasks();
  //   });
  // }

  //Método para cargar MIS TAREAS (del usuario logueado)
  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = this.ordenar(tasks, 'desc');
      this.autorToTasks();
    });
  }

  //Método para tareas de TODOS los usuarios (en task.service)
  loadAllTasks() {
    this.taskService.getTasksNoLogin().subscribe((tasks) => {
      this.tasks = this.ordenar(tasks, 'desc');
      this.autorToTasks();
    });
  }

  //Método para cargar las tareas COMPLETADAS (del usuario logueado)
  loadCompleted() {
    this.taskService.getTasks().subscribe((tasks) => {
      const completedTasks = tasks.filter(
        (task: Task) => task.completed === true
      );
      this.tasks = this.ordenar(completedTasks, 'desc');
      this.autorToTasks();
    });
  }

  //Método para cargar las tareas FAVORITAS (likes) (del usuario logueado)
  loadLiked() {
    this.taskService.getTasks().subscribe((tasks) => {
      const likedTasks = tasks.filter((task: Task) => task.liked === true);

      this.tasks = this.ordenar(likedTasks, 'desc');
      this.autorToTasks();
    });
  }

  autorToTasks() {
    this.tasks.forEach((task) => {
      this.taskService.getUserById(task.userId).subscribe((user) => {
        task.autor = user.username;
      });
    });
  }

  addTask() {
    if (!this.newTaskTitle.trim()) {
      this.feedbackService.msjFeedback('⚠️ El título es obligatorio', 'red');
      return;
    }

    const newTask = {
      title: this.newTaskTitle.trim(),
      description: this.newTaskDescription.trim() || '',
      dateFinal: this.newFechaFin || null,
    };

    this.taskService.addTask(newTask).subscribe({
      next: async (task) => {
        await this.feedbackService.msjFeedback('✅ Tarea creada', 'green');

        this.tasks.push(task);
        this.newTaskTitle = '';
        this.newTaskDescription = '';
        this.newFechaFin = null;
        this.calendario = false;
        this.autorToTasks();

        if (this.router.url === '/home') {
          this.loadTasks();
        } else if (this.router.url === '/tasks') {
          this.loadAllTasks();
        }
      },
      error: () => {
        this.feedbackService.msjFeedback('❌ Error al crear la tarea', 'red');
      },
    });
  }

  // COMPLETADA
  toggleTask(task: Task) {
    this.taskService.toggleTask(task._id!).subscribe((updatedTask) => {
      task.completed = updatedTask.completed;

      if (this.router.url === '/home') {
        this.loadTasks();
      } else if (this.router.url === '/tasks') {
        this.loadAllTasks();
      } else if (this.router.url === '/completed') {
        this.loadCompleted();
      }
    });
  }

  //UPDATE
  updateTask(task: Task) {
    if (!task._id) {
      this.feedbackService.msjFeedback(
        '❌ La tarea no tiene un ID válido',
        'red'
      );
      return;
    }
    if (!task.title.trim()) {
      this.feedbackService.msjFeedback('⚠️ El título es obligatorio', 'red');
      return;
    }

    const updatedTask = {
      title: task.title.trim(),
      description: task.description.trim() || '',
    };

    this.taskService.updateTask(task._id, updatedTask).subscribe({
      next: async (updatedTask) => {
        await this.feedbackService.msjFeedback('✅ Tarea actualizada', 'green');

        //busca la task dentro del arrays tasks por su id--> si coincide, actualiza el task de array con los updatedTask
        const index = this.tasks.findIndex((t) => t._id === task._id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }

        this.editActive();
        this.autorToTasks();
      },

      error: () => {
        this.feedbackService.msjFeedback(
          '❌ Error al actualizar la tarea',
          'red'
        );
      },
    });
  }

  //BOTON EDIT
  editActive() {
    this.editable = !this.editable;
  }

  deleteTask(task: Task) {
    console.log(`Borrar id: ${task._id}`);

    this.taskService.deleteTask(task._id!).subscribe({
      next: async () => {
        await this.feedbackService.msjFeedback('❌ Tarea eliminada', 'red');
        this.tasks = this.tasks.filter((t) => t._id !== task._id);
      },
    });
  }

  // async logout() {

  //   await this.feedbackService.msjFeedback('Sesión cerrada','green');
  //   this.authService.logout();

  // }

  ionViewWillEnter() {
    this.appComponent.titulo = 'Mis tareas';
  }

  // private async msjFeedback(message:string,color:string){
  //   const msj=await this.toastController.create()
  // }

  autorTask(task: Task) {
    this.tasks.forEach((task) => {
      this.taskService.getUserById(task.userId).subscribe((user) => {
        task.autor = user.username;
        // console.log(`Autor de la tarea ${task.title}: ${task.autor}`);
      });
    });
  }

  //Método para cambiar el titulo (h1) de la vista actual
  setTitulo() {
    const url = this.router.url;

    if (url.includes('/home')) {
      this.titulo = 'Mis tareas';
      this.subtitulo = 'Listado del usuario actual';
    } else if (url.includes('/tasks')) {
      this.titulo = 'Todas las tareas';
      this.subtitulo = 'Listado de todos los usuarios';
    } else if (url.includes('/completed')) {
      this.titulo = 'Mis tareas completadas';
      this.subtitulo = 'Listado de mis tareas completadas';
    } else if (url.includes('/liked')) {
      this.titulo = 'Mis tareas favoritas';
      this.subtitulo = 'Listado de mis tareas favoritas';
    }
  }

  mostrarCalendario() {
    this.calendario = !this.calendario;

    // setTimeout(() => {
    //   if (this.calendario && this.calendarioID) {
    //     this.calendarioID.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //   }
    // }, 500);
  }

  //v1
  // ordenar(tasks: any[]) {
  //   return tasks.sort((a, b) => {
  //     return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  //   });
  // }

  ordenarLista(event: any) {
    const orden = event.detail.value;
    this.tasks = [...this.ordenar(this.tasks, orden)];
  }

  ordenar(tasks: any[], orden: string) {
    return tasks.sort((a, b) => {
      if (orden === 'desc') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    });
  }

  likeTask(task: Task) {
    this.likeActive = !this.likeActive;

    this.taskService.likeTask(task._id!).subscribe((likedTask) => {
      task.liked = likedTask.completed;

      if (this.router.url === '/home') {
        this.loadTasks();
      } else if (this.router.url === '/tasks') {
        this.loadAllTasks();
      } else if (this.router.url === '/completed') {
        this.loadCompleted();
      } else if (this.router.url === '/liked') {
        this.loadLiked();
      }
    });
  }

  
}
