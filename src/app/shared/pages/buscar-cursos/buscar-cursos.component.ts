import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { confirmacionUsuario, mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-buscar-cursos',
  templateUrl: './buscar-cursos.component.html',
  styleUrls: ['./buscar-cursos.component.scss'],
})
export class BuscarCursosComponent implements OnInit {
  usuarioLogueado = this.autenticacionService.getUser();
  search: string;
  cursos: Curso[] = [];
  step = 0;
  primeraVez = true;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private autenticacionService: AutenticacionService,
    private alumnoService: AlumnoService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      this.search = param.search;

      this.cursoService.getCursosByFilter(this.search).subscribe((cursos) => {
        // this.accordion.closeAll();
        this.cursos = cursos;
      });
    });
  }

  setStep(index: number) {
    this.step = index;
    this.primeraVez = false;
  }

  nextStep = () =>
    this.step >= this.cursos.length - 1
      ? (this.step = this.cursos.length - 1)
      : this.step++;

  prevStep = () => (this.step <= 0 ? (this.step = 0) : this.step--);

  estaMatriculado = (curso: Curso) =>
    curso.alumnos.find((a) => a.id === this.usuarioLogueado.id);

  matricularse = (curso: Curso) => {
    confirmacionUsuario(
      'Confirmación de usuario',
      `¿Está seguro que desea matricularse al curso ${curso.nombre}?`
    ).then((confirm) =>
      confirm.isConfirmed ? this.matriculacionAlumnoCurso(curso) : null
    );
  };

  matriculacionAlumnoCurso = (curso: Curso) =>
    this.alumnoService
      .inscribirseACurso(this.usuarioLogueado.id, curso.cursoId)
      .subscribe((res) =>
        mensajeConfirmacion(
          'Excelente!',
          `Se ha matriculado al curso ${curso.nombre} exitosamente`
        )
      );

  ingresar = (curso: Curso) =>
    this.router.navigate([`/${this.autenticacionService.getRolSesion().toLowerCase()}/curso`], {
      queryParams: { id: curso.cursoId },
      relativeTo: this.route,
    });
} 
