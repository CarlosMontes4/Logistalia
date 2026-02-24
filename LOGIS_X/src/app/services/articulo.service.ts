import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../model/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private baseUrl = 'http://localhost:8080/api/articulos';

  constructor(private http: HttpClient) { }

  registrarArticulos(articulos: Articulo[]): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl, articulos);
  }

  // Obtener todos los artículos
  obtenerArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.baseUrl);
  }

  // Obtener artículos por solicitud
  obtenerPorSolicitud(solicitudId: number): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.baseUrl}/solicitud/${solicitudId}`);
  }

  // Obtener un artículo por su ID
  obtenerArticulo(id: number): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.baseUrl}/${id}`);
  }

  // Actualizar un artículo
  actualizarArticulo(id: number, articulo: Articulo): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.baseUrl}/${id}`, articulo);
  }

  // Eliminar un artículo
  eliminarArticulo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

