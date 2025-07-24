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
  role: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
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
  openAddForm() {
    // ovde možeš otvoriti modal ili navigirati na /add-destination stranicu
    alert('Otvori formu za dodavanje destinacije');
  }

  editDestination(dest: any) {
    // ovde otvori modal ili stranicu za izmenu sa dest podacima
    alert('Izmena destinacije: ' + dest.name);
  }

  deleteDestination(id: number) {
    if (confirm('Da li si siguran da želiš da obrišeš?')) {
      const token = localStorage.getItem('token') || '';
      this.api.deleteDestination(id, token).subscribe({
        next: () => {
          this.destinations = this.destinations.filter(d => d.id !== id);
        },
        error: err => console.error('Greška pri brisanju:', err)
      });
    }
  }

}
