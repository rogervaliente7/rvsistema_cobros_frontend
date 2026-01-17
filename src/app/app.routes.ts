import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    // NAMESPACE PARA AUTHENTICATION, LOGIN, SIGNUP, FORGOT PASSWORD
    {
        path: 'authentication', component: AuthenticationComponent        
    },

    // NAMESPACE PARA RUTAS DE ADMIN
    {
        path: 'admin',
        component: AdminComponent
    },

    // REDIRECCIONES GENERALES
    { path: '', redirectTo: '/authentication', pathMatch: 'full' },
    { path: '**', redirectTo: '/authentication' }
];
