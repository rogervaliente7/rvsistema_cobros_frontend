import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../models/empleado.model';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, RouterLink],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {

  private readonly API_BASE_URL = 'https://localhost:7011/';
  employees: Empleado[] = [];
  loading = true;
  error: string | null = null;

   constructor(
    @Inject(PLATFORM_ID) public platformId: Object,
    public router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['updated']) {
        alert('Empleado actualizado correctamente ✅');
      }
    });

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

  crearEmpleado() {
    this.router.navigate(['/admin/empleados/new']);
  }
}
