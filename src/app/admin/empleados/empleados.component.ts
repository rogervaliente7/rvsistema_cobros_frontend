import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../models/empleado.model';


@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {

  private readonly API_BASE_URL = 'https://localhost:7011/';
  employees: Empleado[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  this.http.get<Empleado[]>(
    `${this.API_BASE_URL}api/admin/employees`,
    { headers }
  )
  .subscribe({
    next: (data) => {
      this.employees = data;
      console.log(data);
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.error = 'Error cargando empleados';
      this.loading = false;
    }
  });
}
}
