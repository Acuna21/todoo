import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/shared/models/task.interface';
import { TodooService } from 'src/app/shared/services/todoo.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  // Lista de estados para el combobox
  listCombobox = [
    { id: 0, name: 'Todas' },
    { id: 1, name: 'Completadas' },
    { id: 2, name: 'Pendientes' }
  ];

  todos: Task[] = [];
  filteredTodos: Task[] = [];

  paginatedTodos: any[] = []; // Tareas para mostrar en la página actual
  currentPage: number = 1; // Página actual
  pageSize: number = 10; // Tareas por página

  constructor(
    private todooService: TodooService,
    private router: Router,
  ){ }

  ngOnInit(){
    this.todooService.todosList$.subscribe( data => {
      this.todos = data;
      this.filteredTodos = data; // Inicialmente muestra todas las tareas
      this.updatePaginatedTodos(); // Actualiza las tareas paginadas
    });
    if (!this.todos.length) {
      this.todooService.getTodos().subscribe();
    }
  }

  // Función para manejar la opción seleccionada del combobox
  onStatusSelected(item: any) {
    // Filtrar tareas según el estado seleccionado
    if (item.id === 0) {
      // Mostrar todas las tareas
      this.filteredTodos = this.todos;
    } else if (item.id === 1) {
      // Mostrar solo tareas completadas
      this.filteredTodos = this.todos.filter(task => task.completed);
    } else if (item.id === 2) {
      // Mostrar solo tareas pendientes
      this.filteredTodos = this.todos.filter(task => !task.completed);
    }
    this.currentPage = 1; // Resetear a la primera página al filtrar
    this.updatePaginatedTodos(); // Actualizar tareas paginadas
  }

  createTask(){
    this.router.navigate(['/create-task']); 
  }

  // Función para actualizar las tareas paginadas
  updatePaginatedTodos() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTodos = this.filteredTodos.slice(startIndex, endIndex);
  }

  // Funciones para manejar la paginación
  goToNextPage() {
    if ((this.currentPage * this.pageSize) < this.filteredTodos.length) {
      this.currentPage++;
      this.updatePaginatedTodos();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTodos();
    }
  }

  updateTodoState(todoId:number){
    this.todooService.updateState(todoId);
  }

}
