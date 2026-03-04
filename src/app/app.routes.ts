import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { GestionesComponent } from './admin/gestiones/gestiones.component';
import { EmpleadosComponent } from './admin/empleados/empleados.component';
import { EmpleadosEditComponent } from './admin/empleados/empleados-edit/empleados-edit.component';
import { EmpleadosNewComponent } from './admin/empleados/empleados-new/empleados-new.component';
import { CarterasComponent } from './admin/carteras/carteras.component';
import { CompanyComponent } from './admin/company/company.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component'; // 👈 NUEVO

export const routes: Routes = [

  {
    path: 'authentication',
    component: AuthenticationComponent     
  },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: AdminHomeComponent },
      { path: 'gestiones', component: GestionesComponent },
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'empleados/edit/:id', component: EmpleadosEditComponent },
      { path: 'empleados/new', component: EmpleadosNewComponent },
      { path: 'carteras', component: CarterasComponent },

      // Rutas para compañías
      { path: 'company', component: CompanyComponent },
      { path: 'company/new', component: CompanyComponent },
      { path: 'company/edit/:id', component: CompanyComponent },

      // ✅ Rutas para usuarios
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios/new', component: UsuariosComponent },
      { path: 'usuarios/edit/:id', component: UsuariosComponent }
    ]  
  },

  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: '**', redirectTo: '/authentication' }
];