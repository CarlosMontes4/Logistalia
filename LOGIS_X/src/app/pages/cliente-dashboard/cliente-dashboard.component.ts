import { Component } from '@angular/core';
import { UsuarioDTO } from '../../model/usuarioDTO';

@Component({
  selector: 'app-cliente-dashboard',
  standalone: false,
  templateUrl: './cliente-dashboard.component.html',
  styleUrl: './cliente-dashboard.component.css'
})
export class ClienteDashboardComponent {

  usuario: UsuarioDTO;

  constructor() {
    const usuarioString = localStorage.getItem('usuario');
    this.usuario = usuarioString
      ? JSON.parse(usuarioString)
      : { nombre: '', correo: '', rol: '' };
  }
  logout() {
    localStorage.removeItem('usuario');
    window.location.href = '/login';
  }

}
