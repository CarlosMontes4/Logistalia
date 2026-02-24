import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { UsuarioDTO } from '../model/usuarioDTO';


@Injectable({
  providedIn: 'root'
})
export class ClienteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

    const cliente: UsuarioDTO | null = this.authService.usuarioActual;  // Obtiene el usuario actual desde el servicio de autenticación


    if (cliente?.rol === 'CLIENTE') {
      // Si el usuario es un cliente, permite el acceso
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
