import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/models/actions.model';
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
  styleUrls: ['./administrar-calificaciones.component.scss'],
})
export class AdministrarCalificacionesComponent implements OnInit {
  usuarioLogueado = this.auth.getUser();
  tipo = TipoUsuario.Alumno;
  cursos: Curso[] = [];

  cursoDialog = SeleccionarCursoComponent;
  verAlumnos = false;

  alumnos: AlumnoCurso[];

  actions: Actions[] = [];
  actionsHeader: Actions[] = [{}];
  columnas = ['alumno', 'curso', 'feedback', 'calificacion', 'actions'];

  constructor(
    private cursoService: CursoService,
    private auth: AutenticacionService,
    private alumnoCursoService: AlumnoCursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cursoService
      .getCursosByUsuario(this.usuarioLogueado.id)
      .subscribe((cursos) => {
        this.cursos = cursos.map((curso) => ({
          ...curso,
          descripcionAutocomplete: curso.nombre,
        }));
      });

      
    this.actions = [
      {
        tooltip: `Editar calificación`,
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'edit',
        callback: this.editarCalificacion
      }
    ];
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

  editarCalificacion = (calificacion:  AlumnoCurso) => {
    
        const params = { alumnoId: calificacion.alumnoId, cursoId: calificacion.cursoId };


        this.router.navigate([`abm-alumnocurso`],
          {
            queryParams: params,
            relativeTo: this.route,
          }
        );
  }
}
