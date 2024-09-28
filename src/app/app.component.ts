import { Component } from '@angular/core';
import { TodooService } from './shared/services/todoo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todos: any[] = [];
  title = 'todos';
  showCreateTask = false;

  constructor(private todooService: TodooService) {}

   // Lista de estados para el combobox
  listCombobox = [
    { id: 0, name: 'Todas' },
    { id: 1, name: 'Completadas' },
    { id: 2, name: 'Pendientes' }
  ];

  filteredTodos: any[] = [];

  ngOnInit() {
    // Llamar al servicio para obtener las tareas
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

}
