import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Facultad } from 'src/app/models/facultad.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { FacultadService } from 'src/app/services/facultad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-usuario',
  templateUrl: './abm-usuario.component.html',
  styleUrls: ['./abm-usuario.component.scss'],
})
export class AbmUsuarioComponent implements OnInit {
  
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  verTipos =
    this.autenticacionService.getUser().tipo === TipoUsuario.Administrador ||
    this.autenticacionService.getUser().tipo ===
      TipoUsuario.AdministradorFacultad;
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

  get email() {
    return this.usuarioForm.get('email');
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
    private autenticacionService: AutenticacionService,
    private usuarioService: UsuarioService,
    private facultadService: FacultadService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.tiposOptions = this.getTiposByRol();

    this.facultadService
      .getFacultades()
      .subscribe((facultades) => (this.facultades = facultades));

    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.usuarioId = param.id;

      if (param.id) {
        this.usuarioService
          .getUsuarioById(this.usuarioId)
          .subscribe((usuario) => this.setValuesOnForm(usuario));
      }
    });
  }
  private getTiposByRol() {
    const tipos = Object.keys(this.tipos);
    return this.autenticacionService.getRolSesion() ===
      TipoUsuario.Administrador
      ? tipos
      : tipos.filter((tipo) => tipo !== TipoUsuario.Administrador);
  }

  private setValuesOnForm(usuario: Usuario) {
    this.nombres.setValue(usuario.nombres);
    this.apellidos.setValue(usuario.apellidos);
    this.cedula.setValue(usuario.ci);
    this.fechaNacimiento.setValue(usuario.fechaNacimiento);
    this.telefono.setValue(usuario.telefono);
    this.direccion.setValue(usuario.direccion);
    this.emailPersonal.setValue(usuario.emailPersonal);
    this.email.setValue(usuario.email);
    this.facultad.setValue(usuario.facultad.facultadId);
    this.userName.setValue(usuario.userName);
    this.password.setValue(usuario.password);
    this.tipo.setValue(usuario.tipo);

    this.email.disable();
    this.password.disable();
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
      email: [''],
      userName: ['', Validators.required],
      password: [''],
      facultad: ['', [Validators.required]],
      tipo: [''],
    });
  }

  onNoClick(): void {
    this.location.back();
    // Me voy a la pantalla de gestión y elimino del Servicio
    // this.router.navigate([
    //   `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/${this.returnTo}`,
    // ]);
  }

  guardarUsuario(event: Event) {
    event.preventDefault();

    if (this.usuarioForm.invalid) {
      return;
    }

    const usuario = new Usuario(this.nombres.value);

    usuario.apellidos = this.apellidos.value;
    usuario.ci = this.cedula.value;
    usuario.fechaNacimiento = this.fechaNacimiento.value;
    usuario.direccion = this.direccion.value;
    usuario.telefono = this.telefono.value;
    usuario.emailPersonal = this.emailPersonal.value;
    usuario.email = this.email.value;
    usuario.userName = this.userName.value;
    usuario.password = this.password.value;
    usuario.facultadId = this.facultad.value;
    usuario.tipo = this.tipo.value;

    this.modo === 'INS'
      ? this.crearUsuario(usuario)
      : this.editarUsuario(usuario);
  }

  crearUsuario(usuario: Usuario) {
    this.usuarioService.createUsuario(usuario).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el usuario ${this.nombres.value} ${this.apellidos.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.autenticacionService.getRolSesion().toLocaleLowerCase()}/usuario`,
      ]);
    });
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioService.updateUsuario(usuario).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modifico el usuario ${this.nombres.value} ${this.apellidos.value} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.autenticacionService.getRolSesion().toLocaleLowerCase()}/usuario`,
      ]);
    });
  }
}
