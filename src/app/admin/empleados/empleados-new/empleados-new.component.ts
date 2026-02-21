import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados-new',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados-new.component.html',
  styleUrls: ['./empleados-new.component.css']
})
export class EmpleadosNewComponent implements OnInit {
  private readonly API_BASE_URL = 'https://localhost:7011/';
  empleado: Empleado = {} as Empleado;  // Inicializado vacío para el ngModel
  loading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Aquí no necesitamos cargar nada, es un formulario nuevo
  }

  saveEmpleado() {
    this.loading = true;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<Empleado>(`${this.API_BASE_URL}api/admin/employees`, this.empleado, { headers })
      .subscribe({
        next: (data) => {
          this.loading = false;
          alert('Empleado creado correctamente ✅');
          this.router.navigate(['/admin/empleados']);
        },
        error: (err) => {
          console.error(err);
          this.error = 'No se pudo crear el empleado';
          this.loading = false;
        }
      });
  }

  cancelar() {
    this.router.navigate(['/admin/empleados']);
  }
}