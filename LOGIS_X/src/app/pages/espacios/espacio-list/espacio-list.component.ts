import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Espacio } from '../../../model/espacio';
import { EspacioService } from '../../../services/espacio.service';

@Component({
  selector: 'app-espacio-list',
  standalone: false,
  templateUrl: './espacio-list.component.html',
  styleUrl: './espacio-list.component.css'
})
export class EspacioListComponent {
espacios: Espacio[] = [];
  almacenId!: number;

  constructor(
    private espacioService: EspacioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.almacenId = +this.route.snapshot.paramMap.get('almacenId')!;
    this.cargarEspacios();
  }

  cargarEspacios(): void {
    this.espacioService.getByAlmacen(this.almacenId).subscribe(res => {
      this.espacios = res;
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este espacio?')) {
      this.espacioService.delete(id).subscribe({
        next: () => {
          alert('Espacio eliminado correctamente');
          this.cargarEspacios();
        },
        error: (error) => {
          console.error('Error al eliminar el espacio:', error);
          alert('Error al eliminar el espacio');
        }
      });
    }
  }
  irAtras(): void {
    window.history.back();
  }
}
