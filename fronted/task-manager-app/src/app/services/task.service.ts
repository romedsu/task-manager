import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';



export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
  description:string;
  userId:string;
  createdAt:string;
  autor:string;
  dateFinal:string,
  liked:boolean,
}

export interface User {
  _id: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  //aqui la URL donde funciona
  // private apiUrl = environment.apiUrl + '/tasks';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //si en la ruta, el metodo lleva el middleware como parámetro, si hay q pasarle el token


  //ESTOS METODOS (y sus parámetros) SON LO QUE EL FRONTEND ENVIA AL BACKEND, para ñas solicitudes de la API

  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<Task[]>(this.apiUrl, { headers });
  }

  //devuelve todas las tareas sin login (para la ruta /tasks)
  // getTasksNoLogin(): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  // }


  getTasksNoLogin(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  addTask(task: { title: string; description?: string }): Observable<Task> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.post<Task>(`${this.apiUrl}`, task, { headers });
    }

  toggleTask(id: string): Observable<Task> {
    // return this.http.put<Task>(`${this.apiUrl}/${id}`, {});
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}/completed`, {});
  }



  // UPDATE service 
  updateTask(id:string, task: { title: string; description?: string }):Observable<Task>{
    const headers=new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.patch<Task>(`${this.apiUrl}/tasks/${id}`,task,{headers});
  }




  deleteTask(id: string): Observable<any> {
    // return this.http.delete(`${this.apiUrl}/tasks/${id}`);
    return this.http.delete<Task>(`${this.apiUrl}/tasks/${id}`);
  }


  //USUARIO por ID
  getUserById(userId: string): Observable<User> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}` 
    );
  
    return this.http.get<User>(`${this.apiUrl}/auth/users/${userId}`, { headers });
  }

  likeTask(id: string): Observable<Task> {
    // return this.http.put<Task>(`${this.apiUrl}/${id}`, {});
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}/liked`, {});
  }

  
  

}
