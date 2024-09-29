import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodooService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // URL de la API

  // public todosList:Task[] = [];
  public todosList$:BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([])

  constructor(
    private http: HttpClient
  ) { }

  // Método para obtener las tareas
  getTodos(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map( data => {
        console.log('Data')
        this.todosList$.next(data);
        return data
      })
    )
  }

  updateState(todoId:number){
    const todos = this.todosList$.value;
    this.todosList$.next(
      todos.map( todo => {
        if (todo.id === todoId){
          return {...todo, completed: !todo.completed} 
        }
        return todo
      })
    )
  }
}
