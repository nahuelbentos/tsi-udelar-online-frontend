import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { ModalidadCurso } from 'src/app/models/modalidad-curso.enum';
import { ModalidadCurso2 } from 'src/app/models/modalidad-curso2.enum';
import { TemplateCurso } from 'src/app/models/template-curso.model';
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
  cursoForm: FormGroup;
  cursoId: string;

  modalidades = ModalidadCurso;
  modalidadesOptions = [];

  primeraVez = false;
  modo: string;
  hide = true;

  templateCursos: TemplateCurso[] = [
    {
      templateCursoId: '9F4CA882-B42F-473B-85E9-BEFD1E818B7F',
      nombre: 'General',
      descripcion: 'Este es el template general',
    },
  ];

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
    private usuarioService: UsuarioService,
    private cursoService: CursoService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.modalidadesOptions = Object.keys(this.modalidades);

    // Cuando este pronto el ws, se va el comentario
    // this.cursoService
    //   .getTemplateCurso()
    //   .subscribe((templateCursos) => (this.templateCursos = templateCursos));
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
    // Me voy a la pantalla de gestión y elimino del Servicio
    this.router.navigate(['/gestion-curso']);
  }

  guardarCurso(event: Event) {
    event.preventDefault();

    if (this.cursoForm.invalid) {
      return;
    }

    const curso = new Curso(this.nombre.value);

    curso.descripcion = this.descripcion.value;
    curso.modalidadCurso = this.modalidadCurso.value;
    curso.requiereMatriculacion = this.requiereMatriculacion.value;
    curso.salaVirtual = this.salaVirtual.value;
    curso.templateCursoId = this.templateCurso.value;

    this.cursoService.createCurso(curso).subscribe(() => {
      mensajeConfirmacion(
        'Excelente!',
        `Se creó el curso ${this.nombre.value} exitosamente.`
      ).then();
      this.router.navigate(['/gestion-curso']);
    });
  }
}
