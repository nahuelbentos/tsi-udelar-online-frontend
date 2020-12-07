import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { TemplatecursoService } from 'src/app/services/templatecurso.service';
import { SeccionService } from 'src/app/services/seccion.service';
import { TemplateCursoSeccionService } from 'src/app/services/template-curso-seccion.service';
import { TemplateCursoSeccion } from 'src/app/models/template-curso-seccion.model';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-abm-templatecursoseccion',
  templateUrl: './abm-templatecursoseccion.component.html',
  styleUrls: ['./abm-templatecursoseccion.component.scss']
})
export class AbmTemplateCursoSeccionComponent implements OnInit {

  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  templateCursoSeccionForm: FormGroup;
  templateCursoSeccionId: string;
  secciones: any;
  templatesCursos : any;
  primeraVez = false;
  modo: string;
  hide = true;

  get secccion() {
    return this.templateCursoSeccionForm.get('seccion');
  }

  get templateCurso() {
    return this.templateCursoSeccionForm.get('templateCurso');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private templateCursoSeccionService: TemplateCursoSeccionService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private templateCursoService : TemplatecursoService,
    private seccionService : SeccionService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.templateCursoService
    .getTemplateCursos()
    .subscribe((templatesCursos) => (this.templatesCursos = templatesCursos));
    this.seccionService
    .getSecciones()
    .subscribe((secciones) => (this.secciones = secciones));

    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.templateCursoSeccionId = param.id;

      if (param.id) {
        // this.templateCursoService
        //   .getTemplateCursoById(this.templateCursoSeccionId)
        //   .subscribe((cursoSeccion) => this.setValuesOnForm(cursoSeccion));
      }
    });

  }

  private setValuesOnForm(templateCursoSeccion: TemplateCursoSeccion) {
    this.templateCurso.setValue(templateCursoSeccion.TemplateCursoId);
    this.secccion.setValue(templateCursoSeccion.SeccionId);
  }

  private buildForm() {
    this.templateCursoSeccionForm = this.fb.group({
    });
  }

  onNoClick(): void {
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate([
      `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/templatecursoseccion`,
    ]);
  }

  guardarTemplateCursoSeccion(event: Event) {
    event.preventDefault();

    if (this.templateCursoSeccionForm.invalid) {
      return;
    }

    const templateCursoSeccion = new TemplateCursoSeccion();
    templateCursoSeccion.TemplateCursoId = this.templateCurso.value;
    templateCursoSeccion.SeccionId = this.secccion.value;

    this.modo === 'INS'
      ? this.crearTemplateCursoSeccion(templateCursoSeccion)
      : this.editarTemplateCursoSeccion(templateCursoSeccion);
  }

  crearTemplateCursoSeccion(templateCursoSeccion: TemplateCursoSeccion) {
    this.templateCursoSeccionService.createTemplateCursoSeccion(templateCursoSeccion).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el template curso seccion exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/templatecursoseccion`,
      ]);
    });
  }

  editarTemplateCursoSeccion(templateCursoSeccion: TemplateCursoSeccion) {
    this.templateCursoSeccionService.updateTemplateCursoSeccion(templateCursoSeccion).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se editó el template curso seccion exitosamente.`
      ).then();
      this.router.navigate([
        `/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/templatecursoseccion`,
      ]);
    });
  }

}
