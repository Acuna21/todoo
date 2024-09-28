import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  taskName: string = '';
  dueDate: string = ''; // Fecha límite
  people: Array<any> = [];
  skills: Array<string> = [];
  
  newPerson = {
    name: '',
    age: undefined as number | undefined
  };

  newSkill: string = '';

  // Método para agregar una persona asociada
  addPerson() {
    // Verificar que age no sea undefined y que sea mayor o igual a 18
    if (this.newPerson.name && this.newPerson.age !== undefined && this.newPerson.age >= 18) {
      this.people.push({...this.newPerson});
      // Reiniciar el objeto
      this.newPerson = { name: '', age: undefined };
    } else {
      alert('La persona debe tener al menos 18 años.');
    }
  }

  skillInputs: Array<string> = [''];
  // Método para añadir un nuevo input de habilidad
  addSkillInput() {
    this.skillInputs.push(''); // Añade un nuevo input vacío al array
  }

  saveSkills() {
    this.skills = [...this.skillInputs]; // Copia los valores del array de inputs al array de habilidades
    this.skillInputs = ['']; // Reinicia los inputs
  }

  // Método para eliminar una habilidad
  removeSkill(skill: string) {
    this.skills = this.skills.filter(s => s !== skill);
  }

  // Método para guardar la tarea
  saveTask() {
    if (this.taskName && this.dueDate && this.people.length > 0 && this.skills.length > 0) {
      const task = {
        name: this.taskName,
        dueDate: this.dueDate,
        people: this.people,
        skills: this.skills
      };
      console.log('Tarea guardada:', task);
      // Aquí puedes manejar la lógica de guardar la tarea (enviar a un servidor, etc.)
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
}
