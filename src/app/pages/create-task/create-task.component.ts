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
    age: undefined as number | undefined,
    skills: [] as string[] 
  };

  newSkill: string = '';

  // Método para agregar una persona asociada
  addPerson() {
    this.saveSkills();

    // Validar que la edad sea mayor o igual a 18
    if (this.newPerson.age === undefined || this.newPerson.age < 18) {
      alert('La persona debe tener al menos 18 años.');
      return;
    }

    // Validar que el nombre tenga al menos 5 caracteres
    if (this.newPerson.name.length < 5) {
      alert('El nombre debe tener al menos 5 caracteres.');
      return;
    }

    // Verificar que el nombre no esté repetido en la misma tarea
    const personExists = this.people.some(person => person.name === this.newPerson.name);
    if (personExists) {
      alert('Esta persona ya ha sido agregada.');
      return;
    }

    // Validar que tenga al menos una habilidad
    const personHasSkills = this.newPerson.skills.length > 0;
    console.log("personHasSkills",personHasSkills);
    if (!personHasSkills) {
      alert('La persona debe tener al menos una habilidad.');
      return;
    }

    // Si pasa todas las validaciones, agregar a la persona
    this.people.push({ ...this.newPerson });
    this.newPerson = { name: '', age: undefined, skills: [] }; // Reiniciar el objeto
    this.skillInputs = ['']; // Reiniciar los inputs de habilidades
  }

  skillInputs: Array<string> = [''];
  
  // Método para añadir un nuevo input de habilidad
  addSkillInput() {
    this.skillInputs.push(''); // Añade un nuevo input vacío al array
  }

  // Guardar habilidades para la nueva persona
  saveSkills() {
    this.newPerson.skills = this.skillInputs.filter(skill => skill.trim().length > 0); // Solo guarda habilidades no vacías
  }

  // Método para eliminar una habilidad
  removeSkillInput(index: number) {
    this.skillInputs.splice(index, 1); // Eliminar el input en el índice dado
  }
  
  // Método para guardar la tarea
  saveTask() {
    console.log("aca...")
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

  // Método para eliminar una persona
  removePerson(person: any) {
    this.people = this.people.filter(p => p !== person); // Eliminar la persona de la lista
  }
}
