import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/models/actions.model';
import { Curso } from 'src/app/models/curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-administrar-cursos',
  templateUrl: './administrar-cursos.component.html',
  styleUrls: ['./administrar-cursos.component.scss'],
})
export class AdministrarCursosComponent implements OnInit {
  actions: Actions[];
  actionsHeader = [{}];
  constructor(
    private router: Router,
    private autenticacionService: AutenticacionService,
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
        tooltip: `Administrar Calificaciones`,
        callback: this.administrarCalificaciones,
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
  }

  administrarMateriales = (curso: Curso) => {
    const params: { cursoId: string; tipo: TipoUsuario; modo: string } = {
      cursoId: curso.cursoId,
      tipo: TipoUsuario.Docente,
      modo: 'INS'
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
}
