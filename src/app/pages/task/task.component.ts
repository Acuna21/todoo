import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  todos: any[] = [];
  filteredTodos: any[] = [];

  constructor(
    private todooService: TodooService,
    private router: Router,
  ){

  }

  ngOnInit(){
    this.todooService.getTodos().subscribe((data) => {
      console.log('Tareas obtenidas:', data); // Imprime los datos en la consola
      this.todos = data;
      this.filteredTodos = data; // Inicialmente muestra todas las tareas
    });
  }

  // Función para manejar la opción seleccionada del combobox
  onStatusSelected(item: any) {
    console.log('Estado seleccionado:', item);

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
    
  }

  createTask(){
    this.router.navigate(['/create-task']); 
  }

  

  


}
