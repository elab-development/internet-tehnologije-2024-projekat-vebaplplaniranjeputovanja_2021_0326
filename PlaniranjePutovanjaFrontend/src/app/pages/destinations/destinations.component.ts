import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { CardComponent } from '../../shared/card/card.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, FormsModule,
    InputFieldComponent, CardComponent, ButtonComponent],
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  destinations: any[] = [];
  search: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getDestinations().subscribe({
      next: (data) => {
        console.log('Podaci iz API-ja:', data); // 🔥 vidi u konzoli šta dolazi
        this.destinations = data; // ako je data niz
        // ako backend vraća { data: [...] }, onda uradi: this.destinations = data.data;
      },
      error: (err) => {
        console.error('Greška pri dohvaćanju destinacija:', err);
      }
    });
  }

  get filteredDestinations(): any[] {
    if (!this.search.trim()) {
      return this.destinations;
    }
    return this.destinations.filter((d: any) =>
      d.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  openDetails(dest: any) {
    alert(`Destinacija: ${dest.name}`);
  }
}
