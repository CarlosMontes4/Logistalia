import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Almacen } from '../../../model/almacen';
import { AlmacenService } from '../../../services/almacen.service';

@Component({
  selector: 'app-almacen-form',
  standalone: false,
  templateUrl: './almacen-form.component.html',
  styleUrl: './almacen-form.component.css'
})
export class AlmacenFormComponent implements OnInit {
  form!: FormGroup;
  id?: number;
  modoEdicion = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private almacenService: AlmacenService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      ubicacion: ['', Validators.required],
      capacidadTotal: [0, [Validators.required, Validators.min(1)]],
      descripcion: ['']
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        this.modoEdicion = true;
        this.cargarAlmacen(this.id);
      }
    });
  }

  cargarAlmacen(id: number): void {
    this.almacenService.listar().subscribe(data => {
      const almacen = data.find(a => a.id === id);
      if (almacen) {
        this.form.patchValue(almacen);
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) return;

    const almacen: Almacen = this.form.value;

    if (this.modoEdicion && this.id) {
      this.almacenService.actualizar(this.id, almacen).subscribe({
        next: () => this.router.navigate(['/almacenes']),
        error: () => this.error = 'Error al actualizar el almacén'
      });
    } else {
      this.almacenService.crear(almacen).subscribe({
        next: () => this.router.navigate(['/almacenes']),
        error: () => this.error = 'Error al crear el almacén'
      });
    }
  }

  regresarAlmacenes(): void {
    this.router.navigate(['/almacenes']);
  }
}
