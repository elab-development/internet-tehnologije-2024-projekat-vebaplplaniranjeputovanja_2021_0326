import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  onRegister() {
    this.api.register(this.name, this.email, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.is_admin ? 'admin' : 'user');
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Registracija neuspešna');
        console.error(err);
      }
    });
  }
}
