import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-trip-plans',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './trip-plans.component.html',
  styleUrls: ['./trip-plans.component.css']
})
export class TripPlansComponent implements OnInit {
  tripPlans: any[] = [];

  constructor(private api: ApiService) {}  // ← ApiService se automatski ubacuje

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    this.api.getTripPlans(token).subscribe({
      next: data => {
        console.log('Trip plans data:', data);
        this.tripPlans = data
      },
      error: err => console.error('Greška pri dohvaćanju:', err)
    });
  }
}
