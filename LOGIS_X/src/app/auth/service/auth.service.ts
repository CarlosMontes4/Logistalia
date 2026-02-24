import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../../model/usuarioDTO';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  private personSubject = new BehaviorSubject<UsuarioDTO | null>(null);
  public person$ = this.personSubject.asObservable();

  login(data: { correo: string; contrasena: string }): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.apiUrl}/login`, data);
  }

  register(data: { nombre: string; correo: string; contrasena: string }): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.apiUrl}/registro`, data);
  }

  get usuarioActual(): UsuarioDTO | null {
    return this.personSubject.value;
  }
  setUsuario(usuario: UsuarioDTO | null): void {
    this.personSubject.next(usuario);
  }
  logout() {
    this.personSubject.next(null);
    localStorage.removeItem('usuario');
  }
}
