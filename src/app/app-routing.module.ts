import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './pages/task/components/task-list/task-list.component';
import { CreateTaskComponent } from './pages/create-task/create-task.component';
import { TaskComponent } from './pages/task/task.component';

const routes: Routes = [
  { path: 'tasks', component: TaskComponent},  // Ruta para la lista de tareas
  { path: 'create-task', component: CreateTaskComponent },  // Ruta para crear una tarea
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },  // Redirige a la lista de tareas por defecto
  { path: '**', redirectTo: '/tasks' }  // Cualquier ruta no definida redirige a la lista de tareas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
