import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions } from 'src/app/models/actions.model';
import { AlumnoCurso } from 'src/app/models/alumno-curso.model';
import { Curso } from 'src/app/models/curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { AlumnoCursoService } from 'src/app/services/alumno-curso.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { SeleccionarCursoByFacultadComponent } from '../../dialogs/seleccionar-curso-by-facultad/seleccionar-curso-by-facultad.component';
import { SeleccionarCursoByUsuarioComponent } from '../../dialogs/seleccionar-curso-by-usuario/seleccionar-curso-by-usuario.component';
import { SeleccionarCursoComponent } from '../../dialogs/seleccionar-curso/seleccionar-curso.component';

@Component({
  selector: 'app-gestion-calificaciones',
  templateUrl: './gestion-calificaciones.component.html',
  styleUrls: ['./gestion-calificaciones.component.scss']
})
export class GestionCalificacionesComponent implements OnInit {
  usuarioLogueado = this.auth.getUser();
  tipo = TipoUsuario.Alumno;
  cursos: Curso[] = [];

  cursoDialog = this.usuarioLogueado.tipo === TipoUsuario.Docente ? SeleccionarCursoComponent : SeleccionarCursoByFacultadComponent;
  verAlumnos = false;
  calificacionPromedio: number;
  alumnos: AlumnoCurso[];

  actions: Actions[] = [];
  actionsHeader: Actions[] = [{}];
  columnas = ['alumno', 'feedback', 'calificacion'];

  constructor(
    private cursoService: CursoService,
    private auth: AutenticacionService,
    private alumnoCursoService: AlumnoCursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(this.usuarioLogueado.tipo === TipoUsuario.Docente){
    this.cursoService
      .getCursosByUsuario(this.usuarioLogueado.id)
      .subscribe((cursos) => {
        this.cursos = cursos.map((curso) => ({
          ...curso,
          descripcionAutocomplete: curso.nombre,
        }));
      });

    } else {
      this.cursoService
        .getCursosByFacultad(this.usuarioLogueado.facultad.facultadId)
        .subscribe((cursos) => {
          this.cursos = cursos.map((curso) => ({
            ...curso,
            descripcionAutocomplete: curso.nombre,
          }));
        });
    }

  }

  getItem(curso: Curso) {
    console.log('getIsssstem:: ', curso);
    this.alumnoCursoService
      .getAlumnoCursoByCursoId(curso.cursoId)
      .subscribe((alumnos) => {
        console.log('alumnos:: ', alumnos);
        this.verAlumnos = true;
        this.alumnos = alumnos;
      });
  }

}
