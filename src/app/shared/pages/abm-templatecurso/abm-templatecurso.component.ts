import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateCurso } from 'src/app/models/template-curso.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { TemplatecursoService } from 'src/app/services/templatecurso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { Location } from '@angular/common';

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

  get nombre() {
    return this.templateCursoForm.get('nombre');
  }

  get descripcion() {
    return this.templateCursoForm.get('descripcion');
  }

  constructor(
    private autenticacionService: AutenticacionService,
    private templateCursoService: TemplatecursoService,
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
  }

  private setValuesOnForm(templateCurso: TemplateCurso) {
    this.nombre.setValue(templateCurso.nombre);
    this.descripcion.setValue(templateCurso.descripcion);
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
      this.descripcion.value
    );
    console.log(
      ' JSON usuarioSesion',
      JSON.parse(localStorage.getItem('usuarioSesion'))
    );

    templateCurso.descripcion = this.descripcion.value;
    templateCurso.nombre = this.nombre.value;
    templateCurso.templateCursoId = this.templateCursoId;

    this.modo === 'INS'
      ? this.crearTemplateCurso(templateCurso)
      : this.editarTemplateCurso(templateCurso);
  }

  private crearTemplateCurso = (templateCurso: TemplateCurso) =>
    this.templateCursoService
      .createTemplateCurso(templateCurso)
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

  private editarTemplateCurso = (templateCurso: TemplateCurso) =>
    this.templateCursoService
      .updateTemplateCurso(templateCurso)
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
