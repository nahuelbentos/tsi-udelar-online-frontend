import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateCurso } from 'src/app/models/template-curso.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { TemplatecursoService } from 'src/app/services/templatecurso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { Location } from '@angular/common';
import { Seccion } from 'src/app/models/seccion.model';
import { SeccionService } from 'src/app/services/seccion.service';
import { TemplateCursoSeccion } from 'src/app/models/template-curso-seccion.model';
import { TemplateCursoSeccionService } from 'src/app/services/template-curso-seccion.service';

@Component({
  selector: 'app-abm-templatecurso',
  templateUrl: './abm-templatecurso.component.html',
  styleUrls: ['./abm-templatecurso.component.scss'],
})
export class AbmTemplatecursoComponent implements OnInit {
  templateCursoForm: FormGroup;
  templateCursoId: string;

  primeraVez = false;
  modo: string;
  hide = true;

  seccionesData: Seccion[] = [];

  get nombre() {
    return this.templateCursoForm.get('nombre');
  }

  get descripcion() {
    return this.templateCursoForm.get('descripcion');
  }

  get secciones() {
    return this.templateCursoForm.get('secciones');
  }


  constructor(
    private autenticacionService: AutenticacionService,
    private templateCursoService: TemplatecursoService,
    private seccionService: SeccionService,
    private templateCursoSeccionService: TemplateCursoSeccionService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.templateCursoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      secciones: [Seccion],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.templateCursoId = param.id;

      if (param.id) {
        this.templateCursoService
          .getTemplateCursoById(this.templateCursoId)
          .subscribe((templateCurso) => this.setValuesOnForm(templateCurso));
      }
    });
    this.seccionService.getSecciones().subscribe((secciones) => this.seccionesData = secciones);
  }

  private setValuesOnForm(templateCurso: TemplateCurso) {
    this.nombre.setValue(templateCurso.nombre);
    this.descripcion.setValue(templateCurso.descripcion);
    this.templateCursoSeccionService
    .getSeccionesByTempalete( templateCurso.templateCursoId )
    .subscribe( secciones => {
      console.log(secciones);


      if (secciones){
        this.secciones.setValue(secciones);
      }

      })

  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto

    this.location.back();
  }

  guardarTemplateCurso(event: Event) {
    event.preventDefault();

    if (this.templateCursoForm.invalid) {
      return;
    }
    const usuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));
    const templateCurso = new TemplateCurso(
      this.nombre.value,
      this.descripcion.value,
    );
    console.log(
      ' JSON usuarioSesion',
      JSON.parse(localStorage.getItem('usuarioSesion'))
    );

    const templateCursoSeccion = new TemplateCursoSeccion(
      templateCurso,
    );
    const auxSecciones = this.secciones.value;
    templateCursoSeccion.secciones = auxSecciones.map((seccion) => seccion.seccionId);

    this.modo === 'INS'
      ? this.crearTemplateCursoSeccion(templateCursoSeccion)
      : this.editarTemplateCurso(templateCursoSeccion);
  }

  private crearTemplateCursoSeccion = (templateCurso: TemplateCursoSeccion) =>
    this.templateCursoSeccionService
      .createTemplateCursoSeccion(templateCurso)
      .subscribe(() => {
        mensajeConfirmacion(
          'Excelente!',
          `Se creó el template curso ${this.nombre.value} exitosamente.`
        ).then();
        this.router.navigate([
          `/${this.autenticacionService
            .getRolSesion()
            .toLocaleLowerCase()}/templatecurso`,
        ]);
      });

  private editarTemplateCurso = (templateCurso: TemplateCursoSeccion) =>
    this.templateCursoSeccionService
      .updateTemplateCursoSeccion(templateCurso)
      .subscribe(() => {
        mensajeConfirmacion(
          'Excelente!',
          `Se modificó el template curso ${this.nombre.value} exitosamente.`
        ).then();
        this.router.navigate([
          `/${this.autenticacionService
            .getRolSesion()
            .toLocaleLowerCase()}/templatecurso`,
        ]);
      });
}
