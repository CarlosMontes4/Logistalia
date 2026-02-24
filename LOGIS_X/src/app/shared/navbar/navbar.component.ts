import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../../model/usuarioDTO';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  usuario$: Observable<UsuarioDTO | null>;

  constructor(private authService: AuthService, private router: Router) {
     this.usuario$ = this.authService.person$;
   }



  ngOnInit(): void {

  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
