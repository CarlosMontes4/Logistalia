import { Component } from '@angular/core';
import { UsuarioDTO } from '../../../model/usuarioDTO';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuarios-dashboard',
  standalone: false,
  templateUrl: './usuarios-dashboard.component.html',
  styleUrl: './usuarios-dashboard.component.css'
})
export class UsuariosDashboardComponent {

   admins: UsuarioDTO[] = [];
  clientes: UsuarioDTO[] = [];

  modalAbierto = false;
  editando = false;
  form: { id?: number, nombre: string; correo: string; contrasena: string } = {
    nombre: '',
    correo: '',
    contrasena: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.admins = usuarios.filter(u => u.rol === 'ADMIN');
      this.clientes = usuarios.filter(u => u.rol === 'CLIENTE');
    });
  }

  abrirModalNuevoAdmin() {
    this.editando = false;
    this.form = { nombre: '', correo: '', contrasena: '' };
    this.modalAbierto = true;
  }

  editarAdmin(admin: UsuarioDTO) {
    this.editando = true;
    this.form = { id: admin['id'], nombre: admin.nombre, correo: admin.correo, contrasena: '' };
    this.modalAbierto = true;
  }

  guardarAdmin() {
    const usuario: any = {
      nombre: this.form.nombre,
      correo: this.form.correo,
      contrasena: this.form.contrasena,
      rol: 'ADMIN'
    };

    if (this.editando && this.form.id) {
      this.usuarioService.actualizarAdmin(this.form.id, usuario).subscribe(() => this.cargarUsuarios());
    } else {
      this.usuarioService.registrarAdmin(usuario).subscribe(() => this.cargarUsuarios());
    }

    this.cerrarModal();
  }

  eliminarAdmin(admin: UsuarioDTO) {
    if (admin['id']) {
      this.usuarioService.eliminarUsuario(admin['id']).subscribe(() => this.cargarUsuarios());
    }
  }

  cerrarModal() {
    this.modalAbierto = false;
  }
}
