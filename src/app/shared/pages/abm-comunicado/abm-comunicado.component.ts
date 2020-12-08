import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comunicado } from 'src/app/models/Comunicado';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { Location } from '@angular/common';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ComunicadoFacultad } from 'src/app/models/comunicado-facultad';

@Component({
  selector: 'app-abm-comunicado',
  templateUrl: './abm-comunicado.component.html',
  styleUrls: ['./abm-comunicado.component.scss'],
})
export class AbmComunicadoComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  comunicadoForm: FormGroup;
  comunicadoId: string;

  primeraVez = false;
  modo: string;
  hide = true;

  get nombre() {
    return this.comunicadoForm.get('nombre');
  }

  get descripcion() {
    return this.comunicadoForm.get('descripcion');
  }

  get url() {
    return this.comunicadoForm.get('url');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private comunicadoService: ComunicadoService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.comunicadoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.comunicadoId = param.id;

      if (param.id) {
        this.comunicadoService
          .getComunicadoById(this.comunicadoId)
          .subscribe((comunicado) => this.setValuesOnForm(comunicado));
      }
    });
  }

  private setValuesOnForm(comunicado: Comunicado) {
    this.nombre.setValue(comunicado.nombre);
    this.descripcion.setValue(comunicado.descripcion);
    this.url.setValue(comunicado.url);
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto

    this.location.back();
  }

  guardarComunicado(event: Event) {
    event.preventDefault();

    if (this.comunicadoForm.invalid) {
      return;
    }
    // const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));
    const comunicado = new Comunicado(
      this.nombre.value,
      this.descripcion.value,
      this.url.value
    );
    
    comunicado.usuarioEmail = this.usuarioLogueado.email;
    comunicado.descripcion = this.descripcion.value;
    comunicado.nombre = this.nombre.value;
    comunicado.url = this.url.value;
    comunicado.comunicadoId = this.comunicadoId;
    
    if (this.usuarioLogueado.rol === 'AdministradorFacultad'){
      comunicado.facultadId = this.usuarioLogueado.facultad.facultadId;
    }
    console.log("comunicado ", comunicado);
    
    this.modo === 'INS'
      ? this.crearComunicado(comunicado)
      : this.editarComunicado(comunicado);

  }

  private crearComunicado = (comunicado: Comunicado) =>
    this.comunicadoService.createComunicado(comunicado).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el comunicado ${this.nombre.value} exitosamente.`
      ).then( () => this.location.back());
    });

  private editarComunicado = (comunicado: Comunicado) =>
    this.comunicadoService.updateComunicado(comunicado).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó el curso ${this.nombre.value} exitosamente.`
      ).then(() => this.location.back());
    });
}
