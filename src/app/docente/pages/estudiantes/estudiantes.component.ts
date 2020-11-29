import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { Usuario } from 'src/app/models/usuario.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SeleccionarCursoComponent } from 'src/app/shared/dialogs/seleccionar-curso/seleccionar-curso.component';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
  tipo = TipoUsuario.Alumno;
  cursos: Curso[] = [];

  cursoDialog = SeleccionarCursoComponent;

  alumnos: Usuario[];

  constructor(
    private cursoService: CursoService,
    private auth: AutenticacionService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    // this.cursoService.getCursosByUsuario( this.auth.getUser().id ).subscribe( cursos => this.cursos = cursos );
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
    this.usuarioService
      .getAlumnosByCurso(curso.cursoId)
      .subscribe((alumnos) => (this.alumnos = alumnos));
  }
}
