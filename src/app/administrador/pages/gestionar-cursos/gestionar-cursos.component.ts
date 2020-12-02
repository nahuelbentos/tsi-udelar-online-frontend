import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions } from 'src/app/models/actions.model';
import { Curso } from 'src/app/models/curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { Usuario } from 'src/app/models/usuario.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SeleccionarCursoComponent } from 'src/app/shared/dialogs/seleccionar-curso/seleccionar-curso.component';
import { SeleccionarUsuarioComponent } from 'src/app/shared/dialogs/seleccionar-usuario/seleccionar-usuario.component';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-gestionar-cursos',
  templateUrl: './gestionar-cursos.component.html',
  styleUrls: ['./gestionar-cursos.component.scss'],
})
export class GestionarCursosComponent implements OnInit {
  usuarioSesion = this.auth.getUser();
  tipo = TipoUsuario.Administrador;
  actions: Actions[];

  constructor(
    public dialog: MatDialog,
    private cursoService: CursoService,
    private auth: AutenticacionService,
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
        tooltip: `Eliminar curso`,
        mode: 'DLT',
        className: 'button-eliminar',
        tooltipClassName: 'tooltip-red',
        icon: 'delete',
      },
      {
        tooltip: `Agregar docente`,
        callback: this.agregarDocente,
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'add',
      },
    ];
  }

  agregarDocente = (curso: Curso) => {
    const dialogRef = this.dialog.open(SeleccionarUsuarioComponent, {
      height: 'auto',
      width: '700px',
      data: {
        refId: this.usuarioSesion.facultad.facultadId,
        tipo: 'docenteByFacultad',
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((docente: Usuario) => this.addDocente(curso, docente));
  };

  addDocente(curso: Curso, docente: Usuario) {
    this.cursoService
      .addDocente(curso.cursoId, docente.id)
      .subscribe((res) =>
        mensajeConfirmacion(
          'Excelente!',
          `Se ha agregado el docente ${docente.nombres} ${docente.apellidos} a la curso ${curso.nombre}, exitosamente!`
        )
      );
  }
}
