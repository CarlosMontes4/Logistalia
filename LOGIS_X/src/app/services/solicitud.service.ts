import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearSolicitudDTO, SolicitudResponseDTO } from '../model/solictud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = 'http://localhost:8080/api/solicitudes';

  constructor(private http: HttpClient) { }

  /**
   * Servicio para manejar solicitudes de espacio en almacenes.
   * Permite crear solicitudes, buscar disponibilidad y obtener solicitudes por estado o cliente.
   */

  solicitud: SolicitudResponseDTO | null = null;

  getSolicitud(): SolicitudResponseDTO | null {
    return this.solicitud;
  }
  setSolicitud(solicitud: SolicitudResponseDTO | null): void {
    this.solicitud = solicitud;
  }

  // Enviar solicitud de espacio
  crearSolicitud(solicitud: CrearSolicitudDTO): Observable<SolicitudResponseDTO> {
    return this.http.post<SolicitudResponseDTO>(`${this.apiUrl}`, solicitud);
  }

  // Buscar almacenes disponibles para una solicitud
  buscarDisponibilidad(volumen: number, ingreso: string, retiro: string): Observable<any[]> {
    const params = new HttpParams()
      .set('volumen', volumen)
      .set('ingreso', ingreso)
      .set('retiro', retiro);

    return this.http.get<any[]>(`${this.apiUrl}/disponibilidad`, { params });
  }

  // (Opcional) Obtener solicitudes del cliente
  obtenerSolicitudesPorCorreoCliente(correoCliente: string): Observable<any[]> {
    return this.http.get<SolicitudResponseDTO[]>(`${this.apiUrl}/cliente/${correoCliente}`);
  }

  // (Opcional) Obtener solicitud por ID
  obtenerSolicitud(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  obtenerSolicitudesPorEstado(estado: string): Observable<SolicitudResponseDTO[]> {
    return this.http.get<SolicitudResponseDTO[]>(`${this.apiUrl}/estado/${estado}`);
  }

  actualizarEstado(id: number, nuevoEstado: string) {
    return this.http.put(`${this.apiUrl}/${id}/estado/${nuevoEstado}`, {});
  }

  obtenerSolicitudConAlmacenPorId(id: number): Observable<SolicitudResponseDTO> {
    return this.http.get<SolicitudResponseDTO>(`${this.apiUrl}/id/${id}`);
  }


}
