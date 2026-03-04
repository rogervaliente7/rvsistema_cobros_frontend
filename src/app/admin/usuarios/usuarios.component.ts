import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Usuario {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

interface CreateUsuarioDto {
  username: string;
  email: string;
  password: string;
}

interface UpdateUsuarioDto {
  username: string;
  email: string;
  isActive: boolean;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  usuarios: Usuario[] = [];
  newUsuario: CreateUsuarioDto = { username: '', email: '', password: '' };
  editingUsuario: Usuario | null = null;

  apiUrl = 'http://localhost:5103/api/admin/users'; // Ajusta según tu API

  constructor(private http: HttpClient) { 
    this.loadUsuarios();
  }

  // 🔹 Obtener todos los usuarios
  loadUsuarios() {
    this.http.get<Usuario[]>(`${this.apiUrl}`)
      .subscribe(data => this.usuarios = data);
  }

  // 🔹 Crear usuario
  createUsuario() {
    this.http.post(`${this.apiUrl}/create_new_user`, this.newUsuario)
      .subscribe(() => {
        this.newUsuario = { username: '', email: '', password: '' };
        this.loadUsuarios();
      });
  }

  // 🔹 Preparar edición
  editUsuario(usuario: Usuario) {
    this.editingUsuario = { ...usuario };
  }

  // 🔹 Guardar edición
  updateUsuario() {
    if (!this.editingUsuario) return;

    const dto: UpdateUsuarioDto = {
      username: this.editingUsuario.username,
      email: this.editingUsuario.email,
      isActive: this.editingUsuario.isActive
    };

    this.http.put(`${this.apiUrl}/edit_user/${this.editingUsuario.id}`, dto)
      .subscribe(() => {
        this.editingUsuario = null;
        this.loadUsuarios();
      });
  }

  // 🔹 Cancelar edición
  cancelEdit() {
    this.editingUsuario = null;
  }

  // 🔹 Eliminar usuario (soft delete)
  deleteUsuario(usuario: Usuario) {
    if (!confirm(`¿Eliminar al usuario "${usuario.username}"?`)) return;

    this.http.delete(`${this.apiUrl}/delete_user/${usuario.id}`)
      .subscribe(() => this.loadUsuarios());
  }

}