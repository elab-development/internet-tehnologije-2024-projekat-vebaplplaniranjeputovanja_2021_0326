import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  onLogin() {
    this.api.login(this.email, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.is_admin ? 'admin' : 'user');
        this.router.navigate(['/']); // idi na home
      },
      error: (err) => {
        alert('Login neuspešan');
        console.error(err);
      }
    });
  }
}
