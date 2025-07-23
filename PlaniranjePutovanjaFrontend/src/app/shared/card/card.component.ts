import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imageUrl: string = '';

}
//<app-card
//   title="Atina"
//   description="Glavni grad Grčke, pun istorije."
//   imageUrl="https://upload.wikimedia.org/wikipedia/commons/5/50/AcropolisAthens.jpg"
// >
//   <app-button label="Detalji" colorClass="btn-info" (action)="goToDetails()"></app-button>
// </app-card>
//ovako se zove
