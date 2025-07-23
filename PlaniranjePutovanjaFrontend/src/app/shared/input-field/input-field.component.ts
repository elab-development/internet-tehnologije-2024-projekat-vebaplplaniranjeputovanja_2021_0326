import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-field',
  imports: [],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css'
})
export class InputFieldComponent {
  @Input() placeholder: string = "Unesite tekst";
  @Input() type: string = 'text';
  @Input() value: string = '';

  @Output() ValueChange = new EventEmitter<string>();
  onInputChange(event: any){
    this.value = event.target.value;
    this.ValueChange.emit(this.value);

  }
}
//<app-input-field
//   placeholder="Pretraži destinacije"
//   [value]="search"
//   (valueChange)="search = $event"
// ></app-input-field>
// <p>Trenutna vrednost: {{ search }}</p>
//ovako se zove
