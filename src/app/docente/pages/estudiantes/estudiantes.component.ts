import { Component, OnInit } from '@angular/core';
import { Actions } from 'src/app/models/actions.model';
import { Curso } from 'src/app/models/curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SeleccionarCursoByUsuarioComponent } from 'src/app/shared/dialogs/seleccionar-curso-by-usuario/seleccionar-curso-by-usuario.component';
import { SeleccionarCursoComponent } from 'src/app/shared/dialogs/seleccionar-curso/seleccionar-curso.component';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.scss'],
})
export class EstudiantesComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.auth.getUser();
  tipo = TipoUsuario.Alumno;
  cursos: Curso[] = [];
  verAlumnos = false;
  actions: Actions[] = [{}];
  actionsHeader: Actions[] = [{}];
  cursoDialog = SeleccionarCursoByUsuarioComponent;

  alumnos: Usuario[];

  constructor(
    private cursoService: CursoService,
    private auth: AutenticacionService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    
    this.cursoService.getCursosByUsuario(this.usuarioLogueado.id).subscribe(
      (cursos) =>
        (this.cursos = cursos.map((curso) => ({
          ...curso,
          descripcionAutocomplete: curso.nombre,
        })))
    );
  }

  getItem(curso: Curso) {
    this.usuarioService
      .getAlumnosByCurso(curso.cursoId)
      .subscribe((alumnos) => {
        this.alumnos = alumnos;
        this.verAlumnos = true;
      });
  }
}
