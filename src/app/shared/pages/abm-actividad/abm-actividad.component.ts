import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Actividad } from 'src/app/models/actividad.model';
import { Facultad } from 'src/app/models/facultad.model';
import { TipoActividad } from 'src/app/models/tipo-actividad.enum';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-actividad',
  templateUrl: './abm-actividad.component.html',
  styleUrls: ['./abm-actividad.component.scss'],
})
export class AbmActividadComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  actividadForm: FormGroup;
  actividadId: string;

  primeraVez = false;
  modo: string;

  tipos = TipoActividad;
  tiposOptions = [];

  facultades: Facultad[] = [];

  get nombre() {
    return this.actividadForm.get('nombre');
  }

  get descripcion() {
    return this.actividadForm.get('descripcion');
  }

  get fechaRealizada() {
    return this.actividadForm.get('fechaRealizada');
  }

  get fechaFinalizada() {
    return this.actividadForm.get('fechaFinalizada');
  }

  get tipo() {
    return this.actividadForm.get('tipo');
  }

  get esAdministradorFacultad() {
    return this.actividadForm.get('esAdministradorFacultad');
  }

  get esIndividual() {
    return this.actividadForm.get('esIndividual');
  }

  get calificacion() {
    return this.actividadForm.get('calificacion');
  }

  get nota() {
    return this.actividadForm.get('nota');
  }

  get fecha() {
    return this.actividadForm.get('fecha');
  }

  get url() {
    return this.actividadForm.get('url');
  }

  get minutosExpiracion() {
    return this.actividadForm.get('minutosExpiracion');
  }

  get activa() {
    return this.actividadForm.get('activa');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private actividadService: ActividadService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.tiposOptions = Object.keys(this.tipos);

    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.actividadId = param.id;

      if (param.id) {
        this.actividadService
          .getActividadById(this.actividadId)
          .subscribe((actividad) => this.setValuesOnForm(actividad));
      }
    });
  }

  private setValuesOnForm(actividad: Actividad) {
    this.nombre.setValue(actividad.nombre);
    this.descripcion.setValue(actividad.descripcion);
    this.fechaRealizada.setValue(actividad.fechaRealizada);
    this.fechaFinalizada.setValue(actividad.fechaFinalizada);
    this.tipo.setValue(actividad.tipo);
    this.esAdministradorFacultad.setValue(actividad.esAdministradorFacultad);
    this.esIndividual.setValue(actividad.esIndividual);
    this.calificacion.setValue(actividad.calificacion);
    this.nota.setValue(actividad.nota);
    this.fecha.setValue(actividad.fecha);
    this.url.setValue(actividad.url);
    this.minutosExpiracion.setValue(actividad.minutosExpiracion);
    this.activa.setValue(actividad.activa);
  }

  private buildForm() {
    this.actividadForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaRealizada: ['', Validators.required],
      fechaFinalizada: ['', Validators.required],
      tipo: ['', Validators.required],
      esAdministradorFacultad: [false],
      esIndividual: [false],
      calificacion: [''],
      nota: [''],
      fecha: [''],
      url: [''],
      minutosExpiracion: [''],
      activa: [''],
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.location.back();
  }

  guardarActividad(event: Event) {
    event.preventDefault();

    if (this.actividadForm.invalid) {
      return;
    }

    const actividad = new Actividad(this.nombre.value);

    actividad.actividadId = this.actividadId;
    actividad.nombre = this.nombre.value;
    actividad.descripcion = this.descripcion.value;
    actividad.fechaRealizada = this.fechaRealizada.value;
    actividad.fechaFinalizada = this.fechaFinalizada.value;
    actividad.tipo = this.tipo.value;

    this.modo === 'INS'
      ? this.crearActividad(actividad)
      : this.editarActividad(actividad);
  }

  private crearActividad = (actividad: Actividad) =>
    this.actividadService.createActividad(actividad).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el actividad ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([
         `/${this.autenticacionService.getRolSesion().toLocaleLowerCase()}/actividad`,
      ]);
    });

  private editarActividad = (actividad: Actividad) =>
    this.actividadService.updateActividad(actividad).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó el actividad ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([
         `/${this.autenticacionService.getRolSesion().toLocaleLowerCase()}/actividad`,
      ]);
    });
}
