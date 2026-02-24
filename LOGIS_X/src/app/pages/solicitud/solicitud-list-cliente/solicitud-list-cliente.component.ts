import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service';
import { SolicitudResponseDTO } from '../../../model/solictud';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-solicitud-list-cliente',
  standalone: false,
  templateUrl: './solicitud-list-cliente.component.html',
  styleUrl: './solicitud-list-cliente.component.css'
})
export class SolicitudListClienteComponent implements OnInit {

  isAdmin: boolean = false; // Variable para verificar si es admin quien entra a la página
  solicitudes: SolicitudResponseDTO[] = [];
  correoCliente: string = '';
  cargando = true;
  error = '';
  expandedSolicitudes: Set<number> = new Set();

  constructor(private route: ActivatedRoute, private solicitudService: SolicitudService, private authService: AuthService) { }

  ngOnInit(): void {
    this.correoCliente = this.route.snapshot.paramMap.get('correo')!;
    this.solicitudService.obtenerSolicitudesPorCorreoCliente(this.correoCliente).subscribe({
      next: (res: SolicitudResponseDTO[]) => {
        this.solicitudes = res;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error cargando las solicitudes.';
        this.cargando = false;
      }
    });
    this.isAdmin = this.authService.usuarioActual?.rol === 'ADMIN'; // Verifica si el usuario actual es administrador
  }

  // Método para alternar visibilidad
  toggleAccordion(id: number): void {
    if (this.expandedSolicitudes.has(id)) {
      this.expandedSolicitudes.delete(id);
    } else {
      this.expandedSolicitudes.add(id);
    }
  }

  expandedAlmacenes: Set<number> = new Set();

  toggleAlmacen(id: number): void {
    if (this.expandedAlmacenes.has(id)) {
      this.expandedAlmacenes.delete(id);
    } else {
      this.expandedAlmacenes.add(id);

      //Buscar información del almacén
      this.solicitudService.obtenerSolicitudConAlmacenPorId(id).subscribe({
        next: (resp: SolicitudResponseDTO) => {
          this.solicitudes.forEach(
            (solicitud) => {
              if (solicitud.id === resp.id) {
                solicitud.almacen = resp.almacen; // Actualiza la solicitud con la información del almacén
              }
            }
          ); // Actualiza la solicitud con la información del almacén
        },
        error: () => {
          this.error = 'Error cargando el almacén.';
        }
      });
    }
  }

  getEstadoColor(estado: string) {
    switch (estado) {
      case 'PENDIENTE': return 'badge-warning';
      case 'APROBADA': return 'badge-success';
      case 'RECHAZADA': return 'badge-error';
      default: return 'badge-neutral';
    }
  }
  goBack() {
    window.history.back();
  }
}
