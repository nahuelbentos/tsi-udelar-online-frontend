import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions } from 'src/app/models/actions.model';
import { Curso } from 'src/app/models/curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SeleccionarCursoComponent } from 'src/app/shared/dialogs/seleccionar-curso/seleccionar-curso.component';
import {
  confirmacionUsuario,
  mensajeConfirmacion,
} from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-cursos-publicos',
  templateUrl: './cursos-publicos.component.html',
  styleUrls: ['./cursos-publicos.component.scss'],
})
export class CursosPublicosComponent implements OnInit {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();

  // Para ver todos los cursos de mi facultad
  tipo = TipoUsuario.AdministradorFacultad;
  actionsHeader = [{}];
  actions: Actions[] = [];
  columnas: ['nombre', 'descripcion', 'requiereMatriculacion', 'actions'];

  constructor(
    private alumnoService: AlumnoService,
    private autenticacionService: AutenticacionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.actions = [
      {
        tooltip: `Matricularse a un curso`,
        callback: this.matricularse,
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'add',
      },
    ];
  }

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
}
