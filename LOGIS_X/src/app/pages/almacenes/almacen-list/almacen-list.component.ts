import { Component } from '@angular/core';
import { Almacen } from '../../../model/almacen';
import { AlmacenService } from '../../../services/almacen.service';
import { Router } from '@angular/router';
import { SolicitudService } from '../../../services/solicitud.service';
import { SolicitudResponseDTO } from '../../../model/solictud';

@Component({
  selector: 'app-almacen-list',
  standalone: false,
  templateUrl: './almacen-list.component.html',
  styleUrl: './almacen-list.component.css'
})
export class AlmacenListComponent {
  almacenes: Almacen[] = [];
  cargando = false;
  error: string | null = null;
  solicitudEnCurso: SolicitudResponseDTO | null = null;

  mostrarDetallesSolicitud = false;

  constructor(private almacenService: AlmacenService, private router: Router, private solicitudService: SolicitudService) { }

  ngOnInit(): void {
    this.cargarAlmacenes();
    this.cargarSolicitud();
  }

  // Método para cargar la solicitud actual
  cargarSolicitud() {
    this.solicitudEnCurso = this.solicitudService.getSolicitud();
  }

  cargarAlmacenes(): void {
    this.cargando = true;
    this.almacenService.listar().subscribe({
      next: data => {
        this.almacenes = data;
        this.cargando = false;
      },
      error: err => {
        this.error = 'Error al cargar almacenes';
        this.cargando = false;
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este almacén?')) {
      this.almacenService.eliminar(id).subscribe(() => {
        this.cargarAlmacenes();
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
