import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleados-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados-edit.component.html',
  styleUrl: './empleados-edit.component.css'
})
export class EmpleadosEditComponent implements OnInit {
  private readonly API_BASE_URL = 'https://localhost:7011/';
  empleado: Empleado | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

   ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.getEmpleado(id);
  }

  // getEmpleado(id: string) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.http.get<Empleado>(`${this.API_BASE_URL}api/admin/employees/${id}`, { headers })
  //     .subscribe({
  //       next: (data) => { this.empleado = data; this.loading = false; },
  //       error: (err) => { console.error(err); this.error = 'No se pudo cargar el empleado'; this.loading = false; }
  //     });
  // }

  getEmpleado(id: string) {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http.get<Empleado>(`${this.API_BASE_URL}api/admin/employees/${id}`, { headers })
    .subscribe({
      next: (data) => {

        // 🔥 Formatear fechas antes de asignar
        if (data.hire_date) {
          data.hire_date = this.formatDate(data.hire_date);
        }

        if (data.termination_date) {
          data.termination_date = this.formatDate(data.termination_date);
        }

        if (data.birth_date) {
          data.birth_date = this.formatDate(data.birth_date);
        }

        this.empleado = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudo cargar el empleado';
        this.loading = false;
      }
    });
  }

  saveEmpleado() {
    if (!this.empleado) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(`${this.API_BASE_URL}api/admin/employees/${this.empleado.id}`, this.empleado, { headers })
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/empleados'], {
            queryParams: { updated: 'true' }
          });
        },
        error: (err) => {
          console.error(err);
          this.error = 'No se pudo guardar';
        }
      });
  }

  cancelar() {
    this.router.navigate(['/admin/empleados']);
  }

  formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toISOString().substring(0, 10);
  }
}
