import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioDTO } from '../model/usuarioDTO';
import { RegistroDTO } from '../model/registerDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  /**
   * Registra un nuevo administrador
   */
  registrarAdmin(dto: RegistroDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.baseUrl}/registro/admin`, dto);
  }

  /**
   * Lista todos los usuarios
   */
  getUsuarios(): Observable<UsuarioDTO[]> {
    console.log('Fetching all users from:', `${this.baseUrl}/listar`);
    return this.http.get<UsuarioDTO[]>(`${this.baseUrl}/listar`, {});
  }

  /**
   * Elimina un usuario por su ID
   */
  eliminarUsuario(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/eliminar/${id}`);
  }

  /**
 * Actualiza un usuario ADMIN por su ID
 */
actualizarAdmin(id: number, dto: RegistroDTO): Observable<UsuarioDTO> {
  return this.http.put<UsuarioDTO>(`${this.baseUrl}/actualizar/admin/${id}`, dto);
}

/**
 * Actualiza un usuario CLIENTE por su ID
 */
actualizarCliente(id: number, dto: RegistroDTO): Observable<UsuarioDTO> {
  return this.http.put<UsuarioDTO>(`${this.baseUrl}/actualizar/cliente/${id}`, dto);
}
}
