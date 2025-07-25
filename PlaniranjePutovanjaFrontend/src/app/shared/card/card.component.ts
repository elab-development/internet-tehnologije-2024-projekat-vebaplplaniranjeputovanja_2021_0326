import {Component, input, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UppercaseDestPipe} from '../uppercase-dest.pipe';
@Component({
  selector: 'app-card',
  standalone:true,
  imports: [CommonModule, UppercaseDestPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() price: number=0;
  @Input() budget: number=0;
  @Input() destination: string = '';
}
//<app-card
//   title="Atina"
//   description="Glavni grad Grčke, pun istorije."
//   imageUrl="https://upload.wikimedia.org/wikipedia/commons/5/50/AcropolisAthens.jpg"
// >
//   <app-button label="Detalji" colorClass="btn-info" (action)="goToDetails()"></app-button>
// </app-card>
//ovako se zove
