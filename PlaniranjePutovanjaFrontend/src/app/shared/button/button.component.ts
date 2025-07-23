import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-button',
  imports: [
    NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() label: string = 'Click';
  @Input() type: string = 'button';
  @Input() colorClass: string = 'btn-primary';

  @Output() action = new EventEmitter<any>();
  OnClick() {
    this.action.emit();
  }
}
//<app-button label="Sačuvaj" colorClass="btn-success" (action)="saveData()"></app-button>
// <app-button label="Obriši" colorClass="btn-danger" (action)="deleteData()"></app-button>
//ovako se koristi
