import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAdmin = this.authService.usuarioActual?.rol === 'ADMIN'; // Verifica si el usuario actual es un administrador
    // Si el usuario es un administrador, permite el acceso
    if (isAdmin) {
      return true;
    }else {
    // Si el usuario no es un administrador, redirige al login
    this.router.navigate(['/home']);
    return false;
    }
  }
}
