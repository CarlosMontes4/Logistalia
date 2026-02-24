import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UsuarioDTO } from '../../model/usuarioDTO';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo = '';
  contrasena = '';
  constructor(private auth: AuthService, private router: Router) { }

  login() {
    this.auth.login({ correo: this.correo, contrasena: this.contrasena }).subscribe({
      next: (user: UsuarioDTO) => {
        this.auth.setUsuario(user); // Almacenar el usuario en el servicio de autenticación
        // Almacenar el usuario en el localStorage
        localStorage.setItem('usuario', JSON.stringify(user));

        if (user.rol === 'CLIENTE') {
          this.router.navigate(['/cliente']);
        } else if (user.rol === 'ADMIN') {
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        console.error('Error de inicio de sesión:', error);
        alert('Error de inicio de sesión. Por favor, verifica tus credenciales.');
      }
    });
  }
}
