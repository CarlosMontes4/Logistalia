import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AlmacenFormComponent } from './pages/almacenes/almacen-form/almacen-form.component';
import { AlmacenListComponent } from './pages/almacenes/almacen-list/almacen-list.component';
import { AdminGuard } from './guard/admin.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ClienteGuard } from './guard/cliente.guard';
import { ClienteDashboardComponent } from './pages/cliente-dashboard/cliente-dashboard.component';
import { EspacioFormComponent } from './pages/espacios/espacio-form/espacio-form.component';
import { EspacioListComponent } from './pages/espacios/espacio-list/espacio-list.component';
import { SolicitudFormComponent } from './pages/solicitud/solicitud-form/solicitud-form.component';
import { SolicitudListClienteComponent } from './pages/solicitud/solicitud-list-cliente/solicitud-list-cliente.component';
import { SolicitudesAdminComponent } from './pages/solicitud/solicitudes-admin/solicitudes-admin.component';
import { SobreNosotrosComponent } from './shared/sobre-nosotros/sobre-nosotros.component';
import { TrabajaConNosotrosComponent } from './shared/trabaja-con-nosotros/trabaja-con-nosotros.component';
import { PoliticaPrivacidadComponent } from './shared/politica-privacidad/politica-privacidad.component';
import { TerminosDeUsoComponent } from './shared/terminos-de-uso/terminos-de-uso.component';
import { UsuariosDashboardComponent } from './pages/usuarios/usuarios-dashboard/usuarios-dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'nosotros', component: SobreNosotrosComponent },
  { path: 'trabaja-con-nosotros', component: TrabajaConNosotrosComponent },
  { path: 'politica-privacidad', component: PoliticaPrivacidadComponent },
  { path: 'terminos', component: TerminosDeUsoComponent },
  //Authentication routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //Admin routes
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/solicitudes', component: SolicitudesAdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/gesion-usuarios', component: UsuariosDashboardComponent, canActivate: [AdminGuard] },
  //Almacen routes
  { path: 'almacenes', component: AlmacenListComponent, canActivate: [AdminGuard] },
  { path: 'almacenes/crear', component: AlmacenFormComponent, canActivate: [AdminGuard] },
  { path: 'almacenes/editar/:id', component: AlmacenFormComponent, canActivate: [AdminGuard] },
  //Espacio routes
  { path: 'admin/espacios/almacen/:almacenId', component: EspacioListComponent, canActivate: [AdminGuard] },
  { path: 'admin/espacios/nuevo/:almacenId', component: EspacioFormComponent, canActivate: [AdminGuard] },
  { path: 'admin/espacios/editar/:almacenId/:id', component: EspacioFormComponent, canActivate: [AdminGuard] },
  //Cliente routes
  { path: 'cliente', component: ClienteDashboardComponent, canActivate: [ClienteGuard] },
  { path: 'solicitudes/nueva', component: SolicitudFormComponent, canActivate: [ClienteGuard] },
  { path: 'solicitudes/list/cliente/:correo', component: SolicitudListClienteComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
