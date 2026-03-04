import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  private apiUrl = 'http://localhost:5103/api/admin/companies';

  companies: any[] = [];

  showModal = false;
  isEditMode = false;
  selectedId: number | null = null;

  form = this.getEmptyForm();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  // 🔹 Obtener compañías
  getCompanies(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (res) => {
        // Si tu backend maneja soft delete
        this.companies = res?.filter(c => !c.deletedAt);
      },
      error: (err) => {
        console.error('Error al obtener compañías:', err);
      }
    });
  }

  // 🔹 Abrir modal crear
  openCreate(): void {
    this.isEditMode = false;
    this.selectedId = null;
    this.form = this.getEmptyForm();
    this.showModal = true;
  }

  // 🔹 Abrir modal editar
  openEdit(company: any): void {
    this.isEditMode = true;
    this.selectedId = company.id;
    this.form = { ...company };
    this.showModal = true;
  }

  // 🔹 Guardar (POST / PUT)
  save(): void {

    if (this.isEditMode && this.selectedId !== null) {

      this.http.put(`${this.apiUrl}/${this.selectedId}`, {
        id: this.selectedId,
        ...this.form
      }).subscribe({
        next: () => {
          this.afterSave();
        },
        error: (err) => {
          console.error('Error al actualizar compañía:', err);
        }
      });

    } else {

      this.http.post(this.apiUrl, this.form)
        .subscribe({
          next: () => {
            this.afterSave();
          },
          error: (err) => {
            console.error('Error al crear compañía:', err);
          }
        });

    }
  }

  // 🔹 Soft Delete
  delete(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe({
        next: () => {
          this.getCompanies();
        },
        error: (err) => {
          console.error('Error al eliminar compañía:', err);
        }
      });
  }

  // 🔹 Acciones después de guardar
  private afterSave(): void {
    this.closeModal();
    this.getCompanies();
  }

  closeModal(): void {
    this.showModal = false;
    this.form = this.getEmptyForm();
    this.selectedId = null;
  }

  private getEmptyForm() {
    return {
      name: '',
      giro: '',
      email: '',
      phone: '',
      address: '',
      isActive: true
    };
  }
}