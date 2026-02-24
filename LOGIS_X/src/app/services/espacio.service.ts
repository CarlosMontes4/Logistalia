import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Espacio, CrearEspacio } from '../model/espacio';

@Injectable({
  providedIn: 'root'
})
export class EspacioService {
  private apiUrl = 'http://localhost:8080/api/espacios';
  constructor(private http: HttpClient) {}

  getByAlmacen(almacenId: number): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(`${this.apiUrl}/almacen/${almacenId}`);
  }

  create(dto: CrearEspacio): Observable<Espacio> {
    return this.http.post<Espacio>(this.apiUrl, dto);
  }

  update(id: number, dto: CrearEspacio): Observable<Espacio> {
    return this.http.put<Espacio>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerEspacioPorSolicitud(solicitudId: number): Observable<Espacio> {
    return this.http.get<Espacio>(`${this.apiUrl}/solicitud/${solicitudId}`);
  }
}
