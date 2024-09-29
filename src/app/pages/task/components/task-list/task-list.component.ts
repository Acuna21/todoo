import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, User } from 'src/app/shared/models/task.interface';
import { TodooService } from 'src/app/shared/services/todoo.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  // Recibir tareas desde el componente padre
  @Input() tasks: Task[] = [];

  @Output() onComplete = new EventEmitter<Task>();

  // Método para cambiar el estado de completado
  toggleCompletion(task: Task) {
    // task.completed = !task.completed; // Alternar entre completado y pendiente
    this.onComplete.emit(task)
  }

}
