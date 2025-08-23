import {Component, input, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UppercaseDestPipe} from '../uppercase-dest.pipe';
import { HighlightTitleDirective} from '../highlight.directive';
@Component({
  selector: 'app-card',
  standalone:true,
  imports: [CommonModule, UppercaseDestPipe, HighlightTitleDirective],
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

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/200x150'; // fallback
    img.onerror = null; // спречава бесконачан loop
  }
}
//<app-card
//   title="Atina"
//   description="Glavni grad Grčke, pun istorije."
//   imageUrl="https://upload.wikimedia.org/wikipedia/commons/5/50/AcropolisAthens.jpg"
// >
//   <app-button label="Detalji" colorClass="btn-info" (action)="goToDetails()"></app-button>
// </app-card>
//ovako se zove
