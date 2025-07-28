import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-destinations',
  imports: [],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent implements OnInit {
  destinations: any[] = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getDestinations().subscribe(data=> {
      this.destinations = data;
    });
    }

}
