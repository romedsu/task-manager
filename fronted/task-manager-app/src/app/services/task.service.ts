import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) {}

  //si en la ruta, el metodo lleva el middleware como parámetro, si hay q pasarle el token

  getTasks(): Observable<Task[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.get<Task[]>(this.apiUrl, { headers });
  }

  addTask(title: string): Observable<Task> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    return this.http.post<Task>(this.apiUrl, { title });
  }

  toggleTask(id: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, {});
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
