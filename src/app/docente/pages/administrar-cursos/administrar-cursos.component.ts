import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/models/actions.model';
import { Curso } from 'src/app/models/curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
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
    ];
    
    this.getCursos();


  }

  getCursos = () => this.cursoService.getCursosByUsuario(this.usuarioLogueado.id).subscribe( cursos => this.cursos = cursos);

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

  //console.log('Not implemented');

  administrarCalificaciones = () => console.log('Not implemented');

  manejoCalendarioActividades = () => console.log('Not implemented');

  cerrarActas = (curso: Curso) => this.cursoService.cerrarActa(curso.cursoId)
                                                        .subscribe( res =>
                                                          mensajeConfirmacion(
                                                            'Excelente!', 
                                                            `Se ha cerrado el acta del curso ${curso.nombre} ${curso.descripcion},exitosamente`));
}
