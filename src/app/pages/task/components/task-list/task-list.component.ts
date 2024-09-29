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

  // Método para filtrar las personas que cumplen las condiciones
  // filterValidPeople(people: User[]): User[] {
  //   return people.filter(person => person.age >= 18 && person.skills.length > 0);
  // }

}
