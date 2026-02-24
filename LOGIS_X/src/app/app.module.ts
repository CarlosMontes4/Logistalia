import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SobreNosotrosComponent } from './shared/sobre-nosotros/sobre-nosotros.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AlmacenListComponent } from './pages/almacenes/almacen-list/almacen-list.component';
import { AlmacenFormComponent } from './pages/almacenes/almacen-form/almacen-form.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ClienteDashboardComponent } from './pages/cliente-dashboard/cliente-dashboard.component';
import { EspacioListComponent } from './pages/espacios/espacio-list/espacio-list.component';
import { EspacioFormComponent } from './pages/espacios/espacio-form/espacio-form.component';
import { SolicitudFormComponent } from './pages/solicitud/solicitud-form/solicitud-form.component';
import { SolicitudListClienteComponent } from './pages/solicitud/solicitud-list-cliente/solicitud-list-cliente.component';
import { SolicitudesAdminComponent } from './pages/solicitud/solicitudes-admin/solicitudes-admin.component';
import { TrabajaConNosotrosComponent } from './shared/trabaja-con-nosotros/trabaja-con-nosotros.component';
import { TerminosDeUsoComponent } from './shared/terminos-de-uso/terminos-de-uso.component';
import { PoliticaPrivacidadComponent } from './shared/politica-privacidad/politica-privacidad.component';
import { UsuariosDashboardComponent } from './pages/usuarios/usuarios-dashboard/usuarios-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    SobreNosotrosComponent,
    LoginComponent,
    RegisterComponent,
    AlmacenListComponent,
    AlmacenFormComponent,
    AdminDashboardComponent,
    ClienteDashboardComponent,
    EspacioListComponent,
    EspacioFormComponent,
    SolicitudFormComponent,
    SolicitudListClienteComponent,
    SolicitudesAdminComponent,
    TrabajaConNosotrosComponent,
    TerminosDeUsoComponent,
    PoliticaPrivacidadComponent,
    UsuariosDashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
