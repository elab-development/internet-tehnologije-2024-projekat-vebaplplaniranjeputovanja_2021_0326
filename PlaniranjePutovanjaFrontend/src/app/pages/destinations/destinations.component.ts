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
  currentPage = 1;
  pageSize = 6; // 6 kartica po strani

  showAddForm: boolean = false;
  newDest: any = { name: '', description: '', country: '' };
  selectedFile: File | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || '';
    const cached = this.api.getDestinationsCached();
    if (cached) {
      console.log('✅ Učitam iz keša');
      this.destinations = cached;
      // populate flags even for cached data
      this.populateFlagsForAll();
    } else {
      console.log('📡 Učitam sa API-ja');
      this.api.getDestinations().subscribe({
        next: (data) => {
          console.log('Podaci iz API-ja:', data);
          // Ako backend vraća { data: [...] } prilagodi:
          this.destinations = Array.isArray(data) ? data : (data.data || []);
          // sačuvaj u keš
          localStorage.setItem('destinations', JSON.stringify(this.destinations));
          // fetch flags za svaku destinaciju
          this.populateFlagsForAll();
        },
        error: (err) => {
          console.error('Greška pri dohvaćanju destinacija:', err);
        }
      });
    }
  }
  populateFlagsForAll() {
    // Ako nema destinacija - nema šta da radi
    if (!this.destinations || !this.destinations.length) return;

    // Koristimo forEach da za svaku destinaciju zatražimo zastavu
    this.destinations.forEach((dest, idx) => {
      // Ako već postoji dest.flag preskačemo (može biti iz backend-a)
      if (dest.flag) return;

      // Pozovi servis koji enkoduje ime zemlje
      this.api.getCountryInfo(dest.country).subscribe({
        next: (countryData: any) => {
          if (countryData && countryData[0]?.flags?.png) {
            dest.flag = countryData[0].flags.png;
          }
          // Sačuvaj keš posle svake promena (možeš optimizovati)
          localStorage.setItem('destinations', JSON.stringify(this.destinations));
        },
        error: err => {
          console.error('Greška pri dohvaćanju zastave za', dest.country, err);

          localStorage.setItem('destinations', JSON.stringify(this.destinations));
        }
      });
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
  openAddForm() {
    this.showAddForm = true;
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  addDestination() {
    const token = localStorage.getItem('token') || '';
    const formData = new FormData();
    formData.append('name', this.newDest.name);
    formData.append('description', this.newDest.description);
    formData.append('country', this.newDest.country);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.api.addDestination(formData, token).subscribe({
      next: (res) => {
        alert('✅ Destinacija dodata!');
        this.destinations.push(res);
        this.showAddForm = false;
        this.newDest = { name: '', description: '', country: '' };
        this.selectedFile = null;
      },
      error: (err) => {
        console.error('Greška pri dodavanju destinacije:', err);
        alert('❌ Neuspešno dodavanje');
      }
    });
  }
  get pagedDestinations(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredDestinations.slice(start, start + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.filteredDestinations.length) {
      this.currentPage++;
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
