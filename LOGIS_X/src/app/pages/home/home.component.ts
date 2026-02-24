import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      const user = JSON.parse(usuario);
      this.authService.setUsuario(user); // Almacenar el usuario en el servicio de autenticación
      if (user.rol === 'CLIENTE') {
        this.router.navigate(['/cliente']);
      } else if (user.rol === 'ADMIN') {
        this.router.navigate(['/admin']);
      }
    }
  }
}
