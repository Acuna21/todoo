import { Component} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import { TodooService } from 'src/app/shared/services/todoo.service';

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
    private fb: FormBuilder,
    private _todosService:TodooService,
    private _router: Router,
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
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
    this.people.push(personForm);
  }

   // Añadir una nueva habilidad a una persona
  addSkill(personIndex: number) {
    const skills = this.getSkills(personIndex);
    skills.push(this.fb.control('', Validators.required)); 
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
        alert('Debes tener al menos una habilidad.');
    }
  }

  // Pra validar que no haya nombres repetidos en el FormArray de personas
  validePersonNames: ValidatorFn = (control: AbstractControl):ValidationErrors | null =>{
    const names:string[] = this.people.controls.map(person => person.get('name')?.value);
    const founded = names.filter( 
      name => name && control.value && name.trim().toLocaleLowerCase() === control.value.trim().toLocaleLowerCase()
    );
    if (founded.length > 1) return { repeat: 'Valor repetido' };
    else {
      return null
    }
  };

   // Método para guardar la tarea
  saveTask() {
    if (this.taskForm.valid) {
      this._todosService.createTodos(this.taskForm.value);
      this._router.navigate(['/tasks']); 

    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}

