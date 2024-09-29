import { Component} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'; 

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
      name: ['', [Validators.required, Validators.minLength(5), this.validePersonNames]],
      age: [null, [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.fb.control('', Validators.required)])
    });

    console.log("Agregar persona:", personForm);
    this.people.push(personForm);
  }

   // Añadir una nueva habilidad a una persona
  addSkill(personIndex: number) {
    const skills = this.getSkills(personIndex);
    skills.push(this.fb.control('', Validators.required)); 
  }

  // Método para guardar la tarea
  saveTask() {
    console.log('Tarea guardada:', this.taskForm);
    // if (this.taskForm.valid) {
    //   console.log('Tarea guardada:', this.taskForm.value);
    // } else {
    //   alert('Por favor, complete todos los campos correctamente.');
    // }
  }

  // Obtener el FormArray de habilidades de una persona
  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
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


  // Pra validar que no haya nombres repetidos en el FormArray de personas
  validePersonNames: ValidatorFn = (control: AbstractControl):ValidationErrors | null =>{
    const names = this.people.controls.map(person => person.get('name')?.value);
    const founded = names.filter( name => name === control.value );
    if (founded.length > 1) return { repeat: 'Valor repetido' };
    else return null
  };


}
