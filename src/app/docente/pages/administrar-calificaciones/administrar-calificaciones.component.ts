import { Component, OnInit } from '@angular/core';
import { AlumnoCurso } from 'src/app/models/alumno-curso.model';
import { Curso } from 'src/app/models/curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { Usuario } from 'src/app/models/usuario.model';
import { AlumnoCursoService } from 'src/app/services/alumno-curso.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SeleccionarCursoComponent } from 'src/app/shared/dialogs/seleccionar-curso/seleccionar-curso.component';

@Component({
  selector: 'app-administrar-calificaciones',
  templateUrl: './administrar-calificaciones.component.html',
  styleUrls: ['./administrar-calificaciones.component.scss']
})
export class AdministrarCalificacionesComponent implements OnInit {

  tipo = TipoUsuario.Alumno;
  cursos: Curso[] = [];

  cursoDialog = SeleccionarCursoComponent;

  alumnos: AlumnoCurso[];

  constructor(
    private cursoService: CursoService,
    private auth: AutenticacionService,
    private alumnoCursoService: AlumnoCursoService
  ) {}

  ngOnInit(): void {
    this.cursoService.getCursos().subscribe(
      (cursos) =>
        (this.cursos = cursos.map((curso) => ({
          ...curso,
          descripcionAutocomplete: curso.nombre,
        })))
    );
  }

  getItem(curso: Curso) {
    console.log('getItem:: ', curso);
    this.alumnoCursoService
      .getAlumnoCursoByCursoId(curso.cursoId)
      .subscribe((alumnos) => (this.alumnos = alumnos));
  }

}
