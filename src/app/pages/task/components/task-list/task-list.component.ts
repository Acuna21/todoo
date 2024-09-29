import { Component, Input } from '@angular/core';
import { Task, User } from 'src/app/shared/models/task.interface';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  // Recibir tareas desde el componente padre
  @Input() tasks: Task[] = [];

  // Método para cambiar el estado de completado
  toggleCompletion(task: Task) {
    task.completed = !task.completed; // Alternar entre completado y pendiente
  }

}
