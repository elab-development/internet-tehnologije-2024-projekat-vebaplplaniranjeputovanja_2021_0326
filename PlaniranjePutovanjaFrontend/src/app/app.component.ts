import { Component } from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, RouterLink, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PlaniranjePutovanjaFrontend';
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  get isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/';
  }
}
