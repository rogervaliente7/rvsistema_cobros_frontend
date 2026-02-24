import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  email = '';
  password = '';
  showPassword = false;
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Completa todos los campos';
      return;
    }

    const body = { email: this.email, password: this.password };
    const url = 'http://localhost:5103/api/admin/authentication/login'; // endpoint backend

    this.http.post<LoginResponse>(url, body).subscribe({
      next: (res) => {
        if (res.success) {
          // Guardamos token en localStorage
          localStorage.setItem('token', res.token || '');
          // Redirigir automáticamente al dashboard admin
          this.router.navigate(['/admin/home']);
        } else {
          this.error = res.message;
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al conectar con la API';
      }
    });
  }
}