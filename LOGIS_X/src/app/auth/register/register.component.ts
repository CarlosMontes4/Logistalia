import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioDTO } from '../../model/usuarioDTO';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  // FormGroup es una clase que representa un grupo de controles de formulario
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    if (this.form.valid) {
      this.auth.register(this.form.value).subscribe({
        next: (user: UsuarioDTO) => {
          this.auth.setUsuario(user); // Almacenar el usuario en el servicio de autenticación
          localStorage.setItem('usuario', JSON.stringify(user)); // Almacenar el usuario en el localStorage
          if (user.rol === 'CLIENTE') {
            this.router.navigate(['/cliente']);
          } else if (user.rol === 'ADMIN') {
            this.router.navigate(['/admin']);
          }
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          alert('Error en el registro. Por favor, verifica tus datos.');
        }
      });
    }
  }

  get f() {
    return this.form.controls;
  }
}
