import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';


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
            { path: 'home', component: AdminHomeComponent}
        ]  
    },

    // REDIRECCIONES GENERALES
    { path: '', redirectTo: '/authentication', pathMatch: 'full' },
    { path: '**', redirectTo: '/authentication' }
];
