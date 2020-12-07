import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/models/actions.model';
import { CursoSeccion } from 'src/app/models/curso-seccion.model';
import { Curso } from 'src/app/models/curso.model';
import { Seccion } from 'src/app/models/seccion.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoSeccionService } from 'src/app/services/curso-seccion.service';
import { CursoService } from 'src/app/services/curso.service';
import { SeleccionarSeccionComponent } from 'src/app/shared/dialogs/seleccionar-seccion/seleccionar-seccion.component';
import { VerCursoSeccionesComponent } from 'src/app/shared/dialogs/ver-curso-secciones/ver-curso-secciones.component';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-administrar-cursos',
  templateUrl: './administrar-cursos.component.html',
  styleUrls: ['./administrar-cursos.component.scss'],
})
export class AdministrarCursosComponent implements OnInit {
  usuarioLogueado = this.autenticacionService.getUser();
  actions: Actions[];
  actionsHeader = [{}];
  cursos: Curso[];

  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService,
    private cursoService: CursoService,
    private cursoSeccionService: CursoSeccionService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actions = [
      {
        tooltip: `Editar curso`,
        mode: 'UPD',
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'edit',
      },
      {
        tooltip: `Administrar Materiales`,
        callback: this.administrarMateriales,
        backgroundColor: '#43a047',
        icon: 'drafts',
      },
      {
        tooltip: `Cerrar Acta`,
        callback: this.cerrarActas,
        backgroundColor: '#fb8c00',
        icon: 'assignment',
      },
      {
        tooltip: `Manejo de calendario de actividades `,
        callback: this.manejoCalendarioActividades,
        backgroundColor: '#d50000',
        icon: 'event_available',
      },
      {
        tooltip: `Agregar seccion `,
        callback: this.addSeccion,
        backgroundColor: '#90caf9',
        icon: 'crop',
      },
      {
        tooltip: `Ver secciones `,
        callback: this.viewSecciones,
        backgroundColor: '#ffcc80',
        icon: 'dashboard',
      },
    ];

    this.getCursos();
  }

  viewSecciones = (curso: Curso) => {
    const dialogRef = this.dialog.open(VerCursoSeccionesComponent, {
      height: 'auto',
      width: '700px',
      data: {
        cursoId: curso.cursoId,
        cursoNombre: `${curso.nombre} - ${curso.descripcion}`,
      },
    });

  }
  getCursos = () =>
    this.cursoService
      .getCursosByUsuario(this.usuarioLogueado.id)
      .subscribe((cursos) => (this.cursos = cursos));

  administrarMateriales = (curso: Curso) => {
    const params: { cursoId: string; tipo: TipoUsuario; modo: string } = {
      cursoId: curso.cursoId,
      tipo: TipoUsuario.Docente,
      modo: 'INS',
    };
    this.router.navigate(
      [
        `/${this.autenticacionService
          .getRolSesion()
          .toLocaleLowerCase()}/abm-material`,
      ],
      {
        queryParams: params,
        relativeTo: this.route,
      }
    );
  };

  addSeccion = (curso: Curso) => {
    const dialogRef = this.dialog.open(SeleccionarSeccionComponent, {
      height: 'auto',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((seccion: Seccion) => {
      console.log('seccion', seccion);

      if (seccion) {
        console.log('2seccion', seccion);
        const cursoSeccion = new CursoSeccion();
        cursoSeccion.cursoId = curso.cursoId;
        cursoSeccion.seccionId = seccion.seccionId;
        this.cursoSeccionService
          .createCursoSeccion(cursoSeccion)
          .subscribe((res) =>
            mensajeConfirmacion(
              'Excelente!',
              `Se ha agregado la seccion al curso ${curso.nombre} ${curso.descripcion},exitosamente`
            )
          );
      }
    });
  };

  administrarCalificaciones = () => console.log('Not implemented');

  manejoCalendarioActividades = () => console.log('Not implemented');

  cerrarActas = (curso: Curso) =>
    this.cursoService
      .cerrarActa(curso.cursoId)
      .subscribe((res) =>
        mensajeConfirmacion(
          'Excelente!',
          `Se ha cerrado el acta del curso ${curso.nombre} ${curso.descripcion},exitosamente`
        )
      );
}
