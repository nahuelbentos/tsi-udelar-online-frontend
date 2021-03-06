import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Seccion } from 'src/app/models/seccion.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { SeleccionarCarreraComponent } from '../../dialogs/seleccionar-carrera/seleccionar-carrera.component';
import { SeleccionarCursoComponent } from '../../dialogs/seleccionar-curso/seleccionar-curso.component';
import { SeleccionarFacultadComponent } from '../../dialogs/seleccionar-facultad/seleccionar-facultad.component';
import { SeleccionarSeccionComponent } from '../../dialogs/seleccionar-seccion/seleccionar-seccion.component';

@Component({
  selector: 'app-abm-seccion',
  templateUrl: './abm-seccion.component.html',
  styleUrls: ['./abm-seccion.component.scss'],
})
export class AbmSeccionComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();

  seccionForm: FormGroup;
  seccionId: string;

  modo: string;
  secciones: Seccion[] = [];

  get nombre() {
    return this.seccionForm.get('nombre');
  }

  get descripcion() {
    return this.seccionForm.get('descripcion');
  }

  get isDefault() {
    return this.seccionForm.get('isDefault');
  }

  get isVisible() {
    return this.seccionForm.get('isVisible');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private seccionService: SeccionService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.seccionId = param.id;
      console.log(param);
      console.log(this.seccionId);

      if (param.id) {
        this.seccionService
          .getSeccionById(this.seccionId)
          .subscribe((seccion) => this.setValuesOnForm(seccion));
      }
    });
  }

  private setValuesOnForm(seccion: Seccion) {
    this.nombre.setValue(seccion.nombre);
    this.descripcion.setValue(seccion.descripcion);
    this.isDefault.setValue(seccion.isDefault);
    this.isVisible.setValue(seccion.isVisible);
  }

  private buildForm() {
    this.seccionForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      isDefault: [false],
      isVisible: [false],
    });
  }

  onNoClick(): void {
    // en vez de administrador y queda pronto
    this.location.back();
  }

  guardarSeccion(event: Event) {
    event.preventDefault();

    if (this.seccionForm.invalid) {
      return;
    }

    const seccion = new Seccion(this.nombre.value);

    seccion.seccionId = this.seccionId;
    seccion.descripcion = this.descripcion.value;
    seccion.isDefault = this.isDefault.value;
    seccion.isVisible = this.isVisible.value;

    console.log(this.seccionId);

    this.modo === 'INS'
      ? this.crearSeccion(seccion)
      : this.editarSeccion(seccion);
  }

  private crearSeccion = (seccion: Seccion) =>
    this.seccionService.createSeccion(seccion).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó la sección ${seccion.nombre} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.autenticacionService.getRolSesion().toLocaleLowerCase()}/seccion`,
      ]);
    });

  private editarSeccion = (seccion: Seccion) =>
    this.seccionService.updateSeccion(seccion).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó la sección ${seccion.nombre} exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.autenticacionService.getRolSesion().toLocaleLowerCase()}/seccion`,
      ]);
    });

  // Test Dialog
  openDialog = () => {
    const dialogRef = this.dialog.open(SeleccionarCursoComponent, {
      height: 'auto',
      width: '700px',
    });
    dialogRef
      .afterClosed()
      .subscribe((seccion) => console.log('seccion: ', seccion));
  };
}
