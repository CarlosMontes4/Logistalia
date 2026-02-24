import { Component } from '@angular/core';
import { SolicitudService } from '../../../services/solicitud.service';
import { Route, Router } from '@angular/router';
import { SolicitudResponseDTO } from '../../../model/solictud';
import { EspacioService } from '../../../services/espacio.service';
import { Espacio } from '../../../model/espacio';

@Component({
  selector: 'app-solicitudes-admin',
  standalone: false,
  templateUrl: './solicitudes-admin.component.html',
  styleUrl: './solicitudes-admin.component.css'
})
export class SolicitudesAdminComponent {
  solicitudes: SolicitudResponseDTO[] = [];
  solicitudesAprobadas: SolicitudResponseDTO[] = [];
  solicitudesRechazadas: SolicitudResponseDTO[] = [];
  cargando = true;
  mensaje = '';

  solicitudEspacioAsignado: Map<number, boolean> = new Map();
  expandedSolicitudes: Set<number> = new Set();

  constructor(private solicitudService: SolicitudService, private router: Router, private espacioService: EspacioService) { }

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.cargando = true;
    this.solicitudService.obtenerSolicitudesPorEstado("PENDIENTE").subscribe({
      next: (res: SolicitudResponseDTO[]) => {
        this.solicitudes = res;
        if (this.solicitudes.length === 0) {
          this.mensaje = 'No hay solicitudes pendientes.';
        } else {
          this.mensaje = '';
          this.solicitudes.forEach(solicitud => {
            this.espacioService.obtenerEspacioPorSolicitud(solicitud.id).subscribe({
              next: (espacio: Espacio) => {
                if( espacio && espacio.id) {
                this.solicitudEspacioAsignado.set(solicitud.id, true);
                }
                else {
                  this.solicitudEspacioAsignado.set(solicitud.id, false);
                }
              },
              error: () => {
                this.solicitudEspacioAsignado.set(solicitud.id, false);
              }
            });
          });
        }
        this.cargando = false;
      },
      error: () => {
        this.mensaje = 'Error al cargar las solicitudes.';
        this.cargando = false;
      }
    });
  }

  cargarSolicitudesProcesadas() {
    this.cargando = true;
    this.solicitudService.obtenerSolicitudesPorEstado("APROBADA").subscribe({
      next: (res) => {
        this.solicitudesAprobadas = res;
        if (this.solicitudesAprobadas.length === 0) {
          this.mensaje = 'No hay solicitudes aprobadas.';
        } else {
          this.mensaje = '';
        }
        this.cargando = false;
      },
      error: () => {
        this.mensaje = 'Error al cargar las solicitudes aprobadas.';
        this.cargando = false;
      }
    });
    this.solicitudService.obtenerSolicitudesPorEstado("RECHAZADA").subscribe({
      next: (res) => {
        this.solicitudesRechazadas = res;
        if (this.solicitudesRechazadas.length === 0) {
          this.mensaje = 'No hay solicitudes rechazadas.';
        } else {
          this.mensaje = '';
        }
        this.cargando = false;
      },
      error: () => {
        this.mensaje = 'Error al cargar las solicitudes rechazadas.';
        this.cargando = false;
      }
    });
  }


  actualizarEstado(id: number, nuevoEstado: string) {

    this.solicitudService.actualizarEstado(id, nuevoEstado).subscribe({
      next: () => {
        this.mensaje = `Solicitud #${id} ${nuevoEstado.toLowerCase()}.`;
        this.solicitudService.setSolicitud(null); // Limpiar solicitud actual
        this.cargarSolicitudes();
      },
      error: () => {
        this.mensaje = 'Error al actualizar la solicitud.';
        this.cargarSolicitudes();
      }
    });
  }

  verDisponibilidad(solicitud: SolicitudResponseDTO) {
    localStorage.setItem('solicitud', JSON.stringify(solicitud));
    this.solicitudService.setSolicitud(solicitud);
    this.router.navigate(['/almacenes']);
  }


  esSolicitudConEspacio(solictud: SolicitudResponseDTO) {
    return this.solicitudEspacioAsignado.get(solictud.id) === true;
  }

  getEstadoColor(estado: string) {
    switch (estado) {
      case 'PENDIENTE': return 'badge-warning';
      case 'APROBADA': return 'badge-success';
      case 'RECHAZADA': return 'badge-error';
      default: return 'badge-neutral';
    }
  }

  // Método para alternar visibilidad
  toggleAccordion(id: number): void {
    if (this.expandedSolicitudes.has(id)) {
      this.expandedSolicitudes.delete(id);
    } else {
      this.expandedSolicitudes.add(id);
    }
  }

  goBack() {
    this.router.navigate(['/admin']);
  }

}
