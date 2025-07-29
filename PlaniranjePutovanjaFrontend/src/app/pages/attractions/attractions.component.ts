import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {InputFieldComponent} from '../../shared/input-field/input-field.component';
import {CardComponent} from '../../shared/card/card.component';
import {ButtonComponent} from '../../shared/button/button.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-attractions',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    InputFieldComponent, CardComponent, ButtonComponent
  ],
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css']
})
export class AttractionsComponent implements OnInit {
  attractions: any[] = [];
  search: string = '';

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getAttractions().subscribe({
      next: (data) => {
        console.log('Podaci iz API-ja: ', data);//ovo moze da se obrise
        this.attractions = data;
      },
      error: (err) => {
        console.error('Podaci za atrakcije: ', err);
      }
    });
  }

  get filteredAttractions(): any[] {
    if (!this.search.trim()) {
      return this.attractions;
    }
    return this.attractions.filter((a: any) =>
    a.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  openDetails(attraction: any) {
    alert(`Atrakcija: ${attraction.name}`);
  }
}
