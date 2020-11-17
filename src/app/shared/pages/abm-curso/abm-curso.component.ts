import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { ModalidadCurso } from 'src/app/models/modalidad-curso.enum';
import { ModalidadCurso2 } from 'src/app/models/modalidad-curso2.enum';
import { TemplateCurso } from 'src/app/models/template-curso.model';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { CursoService } from 'src/app/services/curso.service';
import { FacultadService } from 'src/app/services/facultad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

enum PrintMedia {
  Newspaper = 1,
  Newsletter = 5,
  Magazine = 5,
  Book = 10,
}

@Component({
  selector: 'app-abm-curso',
  templateUrl: './abm-curso.component.html',
  styleUrls: ['./abm-curso.component.scss'],
})
export class AbmCursoComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = JSON.parse(localStorage.getItem('usuarioSesion'));
  cursoForm: FormGroup;
  cursoId: string;

  modalidades = ModalidadCurso;
  modalidadesOptions = [];

  primeraVez = false;
  modo: string;
  hide = true;

  templateCursos: TemplateCurso[] = [];

  get nombre() {
    return this.cursoForm.get('nombre');
  }

  get descripcion() {
    return this.cursoForm.get('descripcion');
  }

  get modalidadCurso() {
    return this.cursoForm.get('modalidadCurso');
  }

  get requiereMatriculacion() {
    return this.cursoForm.get('requiereMatriculacion');
  }
  get salaVirtual() {
    return this.cursoForm.get('salaVirtual');
  }
  get templateCurso() {
    return this.cursoForm.get('templateCurso');
  }

  constructor(
    private cursoService: CursoService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.buildForm();
  }

  ngOnInit(): void {
    this.modalidadesOptions = Object.keys(this.modalidades);

    // Cuando este pronto el ws, se va el comentario
    this.cursoService
      .getTemplateCursos()
      .subscribe((templateCursos) => (this.templateCursos = templateCursos));

    this.route.queryParams.subscribe((param) => {
      this.modo = param.modo;
      this.cursoId = param.id;

      if (param.id) {
        this.cursoService.getCursoById(this.cursoId).subscribe((curso) => this.setValuesOnForm(curso));
      }
    });
  }

  private setValuesOnForm(curso: Curso) {
    this.nombre.setValue(curso.nombre);
    this.descripcion.setValue(curso.descripcion);
    this.modalidadCurso.setValue(curso.modalidad);
    this.requiereMatriculacion.setValue(
      this.modalidadesOptions[curso.modalidad]
    );
    this.salaVirtual.setValue(curso.salaVirtual);
    this.templateCurso.setValue(curso.templateCurso.templateCursoId);
  }

  private buildForm() {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      modalidadCurso: ['', Validators.required],
      requiereMatriculacion: [''],
      salaVirtual: ['', Validators.required],
      templateCurso: ['', Validators.required],
    });
  }

  onNoClick(): void {
    
    // Hay que suplantar el rol del usuario  (que va a estar en el storage)
    // en vez de administrador y queda pronto
    this.router.navigate([`/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/curso`]);
  }

  guardarCurso(event: Event) {
    event.preventDefault();

    if (this.cursoForm.invalid) {
      return;
    }

    const curso = new Curso(this.nombre.value);

    curso.cursoId = this.cursoId;
    curso.descripcion = this.descripcion.value;
    curso.modalidad = this.modalidadCurso.value;

    curso.requiereMatriculacion = this.requiereMatriculacion.value ? this.requiereMatriculacion.value : false;
    curso.salaVirtual = this.salaVirtual.value;
    curso.templateCursoId = this.templateCurso.value;

    this.modo === 'INS' ? this.crearCurso(curso) : this.editarCurso(curso);
  }

  private crearCurso = (curso: Curso) =>
    this.cursoService.createCurso(curso).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el curso ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([`/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/curso`]);
    });

  private editarCurso = (curso: Curso) =>
    this.cursoService.updateCurso(curso).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se modificó el curso ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate([`/${this.usuarioLogueado.tipo.toLocaleLowerCase()}/curso`]);
    });
}
