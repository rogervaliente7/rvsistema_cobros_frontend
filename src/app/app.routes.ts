import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { GestionesComponent } from './admin/gestiones/gestiones.component';
import { EmpleadosComponent } from './admin/empleados/empleados.component';
import { EmpleadosEditComponent } from './admin/empleados/empleados-edit/empleados-edit.component';


export const routes: Routes = [
    // NAMESPACE PARA AUTHENTICATION, LOGIN, SIGNUP, FORGOT PASSWORD
    {
        path: 'authentication', component: AuthenticationComponent     
    },

    // NAMESPACE PARA RUTAS DE ADMIN
    {
        path: 'admin', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: 'home', component: AdminHomeComponent},
            { path: 'gestiones', component: GestionesComponent},
            { path: 'empleados', component: EmpleadosComponent},
            { path: 'empleados/edit/:id', component: EmpleadosEditComponent}
        ]  
    },

    // REDIRECCIONES GENERALES
    { path: '', redirectTo: '/authentication', pathMatch: 'full' },
    { path: '**', redirectTo: '/authentication' }
];
