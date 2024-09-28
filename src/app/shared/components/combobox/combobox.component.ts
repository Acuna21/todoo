import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
type CustomClass = 'combobox-white' | 'combobox-blue' | 'large-white';
@Component({
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss']
})
export class ComboboxComponent {
  @Input() items: any[]= [];

  // que propiedad quieres mostrar del objet
  @Input() displayProperty: string= '';

  // asigna como iniciar lo que quiero mostrar
  // de esta forma: [startItem]="listCombobox[0]"
  @Input() startItem: any = null;

  @Input() disabled:boolean = false;

  // Para asignarle el estilo al combobox
  @Input() customClass: CustomClass = 'combobox-white';

  @Input() message?: string = "Seleccione una opción";

  @Input() showIconDelete = false; // Para control del icono eliminar

  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();

  public selectedItem: any;
  public showOptions: boolean = false;

  ngOnInit() {
    if (this.items){
      if (this.startItem) {
        this.selectItem(this.startItem);
      } else {
        this.selectedItem = this.displayProperty ? {
          id: "unselected",
          [this.displayProperty]: this.message,
        } :  this.message;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startItem']) {
      this.selectItem(this.startItem);
    }
  }

  showOptionsToggle() {
    if(this.disabled) return;
    this.showOptions = !this.showOptions;
  }

  selectItem(item: any) {
    if (item === null) {
      this.selectedItem = {
        id: "unselected",
        [this.displayProperty]: this.message,
      }
      return
    }
    this.selectedItem = item;
    this.showOptions = false;
    this.itemSelected.emit(item);
  }

  deleteItem(event:any){
    if (!this.showIconDelete || !this.selectedItem) {
      return;
    }
    // Actualizar selectedItem a null (no seleccionado)
    this.selectedItem = null;

    // Emitir el evento con el selectedItem actualizado (null)
    this.itemSelected.emit(this.selectedItem);
    
    event.stopPropagation();
  }
  

}
