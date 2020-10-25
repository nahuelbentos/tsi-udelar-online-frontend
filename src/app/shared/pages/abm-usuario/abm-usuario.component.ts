import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Facultad } from 'src/app/models/facultad.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { Usuario } from 'src/app/models/usuario.model';
import { FacultadService } from 'src/app/services/facultad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.scss'],
})
export class AbmUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  usuarioId: string;

  tipos = TipoUsuario;
  tiposOptions = [];

  primeraVez = false;
  modo: string;
  hide = true;

  facultades: Facultad[] = [];

  get nombres() {
    return this.usuarioForm.get('nombres');
  }

  get apellidos() {
    return this.usuarioForm.get('apellidos');
  }

  get cedula() {
    return this.usuarioForm.get('cedula');
  }

  get fechaNacimiento() {
    return this.usuarioForm.get('fechaNacimiento');
  }
  get direccion() {
    return this.usuarioForm.get('direccion');
  }
  get telefono() {
    return this.usuarioForm.get('telefono');
  }

  get emailPersonal() {
    return this.usuarioForm.get('emailPersonal');
  }

  get userName() {
    return this.usuarioForm.get('userName');
  }

  get password() {
    return this.usuarioForm.get('password');
  }

  get facultad() {
    return this.usuarioForm.get('facultad');
  }

  get tipo() {
    return this.usuarioForm.get('tipo');
  }

  constructor(
    private usuarioService: UsuarioService,
    private facultadService: FacultadService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.tiposOptions = Object.keys(this.tipos);

    this.facultadService
      .getFacultades()
      .subscribe((facultades) => (this.facultades = facultades));
  }

  private buildForm() {
    this.usuarioForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', Validators.required],
      fechaNacimiento: [''],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      emailPersonal: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: [''],
      facultad: ['', [Validators.required]],
      tipo: [''],
    });
  }

  onNoClick(): void {
    // Me voy a la pantalla de gestión y elimino del Servicio
    this.router.navigate(['/gestion-usuario']);
  }

  guardarUsuario(event: Event) {
    event.preventDefault();

    if (this.usuarioForm.invalid) {
      return;
    }

    const usuario = new Usuario(this.nombres.value);

    usuario.apellidos = this.apellidos.value;
    usuario.cedula = this.cedula.value;
    usuario.fechaNacimiento = this.fechaNacimiento.value;
    usuario.direccion = this.direccion.value;
    usuario.telefono = this.telefono.value;
    usuario.emailPersonal = this.emailPersonal.value;
    usuario.userName = this.userName.value;
    usuario.password = this.password.value;
    usuario.facultadId = this.facultad.value;
    usuario.tipo = this.tipo.value;

    this.usuarioService.createUsuario(usuario).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el usuario ${this.nombres.value} ${this.apellidos.value} exitosamente.`
      ).then();
      this.router.navigate(['/gestion-usuario']);
    });
  }
}
