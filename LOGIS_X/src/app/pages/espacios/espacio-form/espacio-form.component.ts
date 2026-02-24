import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrearEspacio } from '../../../model/espacio';
import { EspacioService } from '../../../services/espacio.service';
import { SolicitudResponseDTO } from '../../../model/solictud';
import { SolicitudService } from '../../../services/solicitud.service';

@Component({
  selector: 'app-espacio-form',
  standalone: false,
  templateUrl: './espacio-form.component.html',
  styleUrl: './espacio-form.component.css'
})
export class EspacioFormComponent implements OnInit {

  solicitudEnCurso: SolicitudResponseDTO | null = null; // Variable para controlar si hay una solicitud en curso
  espacioId: number | null = null;
  almacenId: number = 0;
  form: CrearEspacio = { capacidad: 0, fechaOcupacion: undefined, fechaDesocupacion: undefined, almacenId: 0, solicitudId: 0, disponible: true };
  mostrarDetallesSolicitud = false;

  constructor(
    private espacioService: EspacioService,
    private route: ActivatedRoute,
    private router: Router,
    private solicitudService: SolicitudService
  ) { }

  ngOnInit(): void {

    // Cargar la solicitud en curso
    this.solicitudEnCurso = this.solicitudService.getSolicitud();


    this.espacioId = +this.route.snapshot.paramMap.get('id')!;
    const almacenIdParam = this.route.snapshot.paramMap.get('almacenId');

    if (almacenIdParam) {
      this.almacenId = +almacenIdParam;
      this.form.almacenId = this.almacenId;
    }

    if (this.espacioId && !isNaN(this.espacioId)) {
      // Carga actual si se está editando
      this.espacioService.getByAlmacen(this.almacenId).subscribe(lista => {
        const actual = lista.find(e => e.id === this.espacioId);
        if (actual) {
          this.form = {
            capacidad: actual.capacidad || this.solicitudEnCurso?.volumen || 0,
            almacenId: actual.almacenId,
            disponible: actual.disponible || false,
            fechaOcupacion: actual.fechaOcupacion || this.solicitudEnCurso?.fechaIngreso || undefined,
            fechaDesocupacion: actual.fechaDesocupacion || this.solicitudEnCurso?.fechaRetiro || undefined,
            solicitudId: actual.solicitudId || this.solicitudEnCurso?.id || 0
          };
        }
      });
    }else{ //Creo un nuevo espacio
      this.form = {
            capacidad: this.solicitudEnCurso?.volumen || 0,
            almacenId: this.almacenId,
            disponible: false,
            fechaOcupacion: this.solicitudEnCurso?.fechaIngreso || undefined,
            fechaDesocupacion: this.solicitudEnCurso?.fechaRetiro || undefined,
            solicitudId: this.solicitudEnCurso?.id || 0
          };
    }
  }

  guardar(): void {
    if (this.espacioId) {
      this.espacioService.update(this.espacioId, this.form).subscribe(() => {
        this.router.navigate(['/admin/almacenes']);
      });
    } else {
      this.espacioService.create(this.form).subscribe({
        next: () => {
          alert('Espacio creado correctamente');
          this.router.navigate(['/admin/almacenes']);
        },
        error: (error) => {
          console.error('Error:', error);
          alert(error.error); // Muestra el mensaje en la interfaz
        }
      });
    }
  }
}
