import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Cartera {
  id: string;
  name: string;
  tipo: string;
  companyId: number;
  companyName?: string;
  isActive?: boolean;
  fechaRegistro?: string;
  deletedAt?: string;
}

interface CreateCarteraDto {
  name: string;
  tipo: string;
  companyId: number;
}

@Component({
  selector: 'app-carteras',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './carteras.component.html',
  styleUrls: ['./carteras.component.css']
})
export class CarterasComponent {

  carteras: Cartera[] = [];
  newCartera: CreateCarteraDto = { name: '', tipo: '', companyId: 1 };
  editingCartera!: Cartera | null; // ⚡ "!" para evitar errores de null
  apiUrl = 'http://localhost:5103/api/admin/carteras';

  constructor(private http: HttpClient) { 
    this.loadCarteras();
  }

  // 🔹 Obtener todas las carteras
  loadCarteras() {
    this.http.get<Cartera[]>(this.apiUrl)
      .subscribe(data => this.carteras = data);
  }

  // 🔹 Abrir modal: limpiar formulario
  openCreateModal() {
    this.newCartera = { name: '', tipo: '', companyId: 1 };
  }

  // 🔹 Crear nueva cartera
  createCartera() {
    if (!this.newCartera.name || !this.newCartera.tipo) {
      alert('Completa todos los campos');
      return;
    }

    this.http.post<Cartera>(this.apiUrl, this.newCartera)
      .subscribe(() => {
        this.newCartera = { name: '', tipo: '', companyId: 1 };
        this.loadCarteras();
      });
  }

  // 🔹 Preparar edición
  editCartera(cartera: Cartera) {
    this.editingCartera = { ...cartera };
  }

  // 🔹 Guardar edición
  updateCartera() {
    if (!this.editingCartera) return;

    this.http.put<Cartera>(`${this.apiUrl}/${this.editingCartera.id}`, this.editingCartera)
      .subscribe(() => {
        this.editingCartera = null;
        this.loadCarteras();
      });
  }

  // 🔹 Cancelar edición
  cancelEdit() {
    this.editingCartera = null;
  }

  // 🔹 Eliminar cartera (soft delete)
  deleteCartera(cartera: Cartera) {
    if (!confirm(`¿Eliminar la cartera "${cartera.name}"?`)) return;

    this.http.delete(`${this.apiUrl}/${cartera.id}`)
      .subscribe(() => this.loadCarteras());
  }

}