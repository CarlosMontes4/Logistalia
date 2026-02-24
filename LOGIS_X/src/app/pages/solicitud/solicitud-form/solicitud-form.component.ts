import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SolicitudService } from '../../../services/solicitud.service';
import { Router } from '@angular/router';
import { Articulo } from '../../../model/articulo';
import { SolicitudResponseDTO } from '../../../model/solictud';
import { ArticuloService } from '../../../services/articulo.service';
@Component({
  selector: 'app-solicitud-form',
  standalone: false,
  templateUrl: './solicitud-form.component.html',
  styleUrl: './solicitud-form.component.css'
})
export class SolicitudFormComponent implements OnInit {

  solicitudForm!: FormGroup;
  almacenesDisponibles: any[] = [];
  mensaje: string = '';
  cargando = false;

  //Articulos
  abrirModal = false;
  articulos: Articulo[] = [];
  nuevoArticulo: Articulo = {
    nombreArticulo: '',
    descripcion: '',
    cantidad: 0,
    solicitudId: 0 // Este ID se asignará después de crear la solicitud
  };

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private solicitudService: SolicitudService,
    private router: Router,
    private articuloService: ArticuloService) { }

  ngOnInit(): void {
    // Obtener el correo del cliente desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const correoCliente = usuario.correo || '';

    this.solicitudForm = this.fb.group({
      correoCliente: [correoCliente, Validators.required],
      tipoMercancia: ['', Validators.required],
      volumen: ['', [Validators.required, Validators.min(1)]],
      fechaIngreso: ['', Validators.required],
      fechaRetiro: ['', Validators.required],
    }, {
      validators: this.fechasValidas
    });
  }

  // Buscar almacenes
  buscarAlmacenes() {
    const { volumen, fechaIngreso, fechaRetiro } = this.solicitudForm.value;
    this.cargando = true;
    this.solicitudService.buscarDisponibilidad(volumen, fechaIngreso, fechaRetiro).subscribe({
      next: (res) => {
        this.almacenesDisponibles = res;
        this.cargando = false;
      },
      error: () => {
        this.mensaje = 'Error consultando disponibilidad.';
        this.cargando = false;
      }
    });
  }

  // Enviar solicitud
  enviarSolicitud() {
    if (this.solicitudForm.invalid) return;
    this.solicitudService.crearSolicitud(this.solicitudForm.value).subscribe({
      next: (resp: SolicitudResponseDTO) => {
        // Asignar el ID de la solicitud a los artículos
        this.articulos.forEach(articulo => {
          articulo.solicitudId = resp.id; // Asignar el ID de la solicitud creada
        });
        // Aquí podrías enviar los artículos al servidor si es necesario
        this.articuloService.registrarArticulos(this.articulos).subscribe({
          next: (res) => {
            this.mensaje = 'Solicitud enviada correctamente.';
            this.solicitudForm.reset();
            this.almacenesDisponibles = [];
            window.alert('Su solicitud ha sido enviada con éxito.');
            this.router.navigate(['/cliente']); // Redirigir a la lista de solicitudes
          },
          error: () => this.mensaje = 'Error al registrar los artículos.'
        });
      },
      error: () => this.mensaje = 'Error al enviar la solicitud.'
    });
  }
  get correoCliente() {
    return this.solicitudForm.get('correoCliente');
  }
  get tipoMercancia() {
    return this.solicitudForm.get('tipoMercancia');
  }
  get volumen() {
    return this.solicitudForm.get('volumen');
  }
  get fechaIngreso() {
    return this.solicitudForm.get('fechaIngreso');
  }
  get fechaRetiro() {
    return this.solicitudForm.get('fechaRetiro');
  }

  fechasValidas(group: AbstractControl): { [key: string]: boolean } | null {
    const fechaIngreso = group.get('fechaIngreso')?.value;
    const fechaRetiro = group.get('fechaRetiro')?.value;

    if (fechaIngreso && fechaRetiro && fechaRetiro <= fechaIngreso) {
      return { fechasInvalidas: true };
    }

    return null;
  }

  guardarArticulo() {
    this.articulos.push({ ...this.nuevoArticulo });
    this.nuevoArticulo = { nombreArticulo: '', descripcion: '', cantidad: 1 };
    this.abrirModal = false;
  }

  eliminarArticulo(art: any) {
    this.articulos = this.articulos.filter(a => a !== art);
  }
  get costeEstimado(): number {
    const volumenValue = this.volumen?.value;
    return typeof volumenValue === 'number' && !isNaN(volumenValue) ? volumenValue * 12.89 : 0;
  }

}
