import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminComponent } from './admin/admin.component';
import { CobrosComponent } from './vistas/cobros.component';

export const routes: Routes = [

  // 🔐 LOGIN
  {
    path: 'authentication',
    component: AuthenticationComponent
  },

  // 🧩 DASHBOARD (solo dashboard)
  {
    path: 'admin',
    component: AdminComponent
  },

  // 📁 EXPEDIENTE DE COBROS (ruta independiente)
  {
    path: 'cobros',
    component: CobrosComponent
  },

  // 🔁 REDIRECCIONES
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: '**', redirectTo: '/authentication' }

];
