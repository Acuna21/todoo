import { Component} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  // Formulario principal para crear tareas
  taskForm: FormGroup;

  skills: Array<string> = [];
  skillInputs: Array<string> = [''];
  
  newSkill: string = '';

  constructor(
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      people: this.fb.array([]) // Inicializamos un FormArray vacío
    });

    // Agrega una persona por defecto al cargar el componente
    this.addPerson();
  }

  // Obtener el FormArray de personas
  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  // Método para agregar una persona asociada
  addPerson() {
    const personForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      age: [null, [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)])
    });

    console.log("Agregar persona:", personForm);
    this.people.push(personForm);
  }

   // Añadir una nueva habilidad a una persona
  addSkill(personIndex: number) {
    const skills = this.getSkills(personIndex);
    skills.push(this.fb.control('', Validators.required)); // Añade un nuevo control para la habilidad
  }

  // Eliminar una persona del FormArray
  removePerson(index: number) {
    this.people.removeAt(index);
  }
  
  // Método para guardar la tarea
  saveTask() {
    if (this.taskForm.valid) {
      console.log('Tarea guardada:', this.taskForm.value);
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

  // Obtener el FormArray de habilidades de una persona
  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  // Guardar persona
  savePerson(index: number) {
    const person = this.people.at(index);
    
    if (person.valid) {
      // Aquí podrías hacer lo que desees con la persona (ej. enviar a un servicio o guardar en un backend)
      console.log('Persona guardada:', person.value);
      
      // Limpiar campos de entrada de la persona
      person.reset({
        name: '',
        age: null,
        skills: [this.fb.control('')]
      });
    } else {
      alert('Por favor, complete todos los campos correctamente para esta persona.');
    }
  }

  // Método para eliminar una habilidad de una persona
removeSkill(personIndex: number, skillIndex: number) {
  const skills = this.getSkills(personIndex);
  if (skills.length > 1) { // Asegúrate de que haya más de una habilidad para eliminar
      skills.removeAt(skillIndex);
  } else {
      // Puedes mostrar un mensaje o manejar el caso cuando no hay más habilidades
      alert('Debes tener al menos una habilidad.');
  }
}


}
