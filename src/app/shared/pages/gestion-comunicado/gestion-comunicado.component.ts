import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Comunicado } from 'src/app/models/Comunicado';
import { ComunicadoCurso } from 'src/app/models/comunicado-curso';
import { Curso } from 'src/app/models/curso.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { UsuarioSesion } from 'src/app/models/usuario-sesion.model';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { SeleccionarCursoComponent } from '../../dialogs/seleccionar-curso/seleccionar-curso.component';

@Component({
  selector: 'app-gestion-comunicado',
  templateUrl: './gestion-comunicado.component.html',
  styleUrls: ['./gestion-comunicado.component.scss'],
})
export class GestionComunicadoComponent implements OnInit, OnChanges {
  usuarioLogueado: UsuarioSesion = this.autenticacionService.getUser();
  comunicados: Comunicado[];
  createComponent = false;
  columnas = ['nombre', 'descripcion', 'url', 'actions'];

  @Input() actions = null;

  constructor(
    private comunicadoService: ComunicadoService,
    private autenticacionService: AutenticacionService,
    public dialog: MatDialog, 
    private router: Router, 
  ) {
    if (this.usuarioLogueado.rol === 'AdministradorFacultad') {
      this.GetComunicadosByFacultadId(this.usuarioLogueado.facultad.facultadId);
      console.log('AdministradorFacultad ');
    } else {
      console.log('Administrador ');
      this.getComunicados();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('actions ', this.actions);

    this.actions = [
      {
        tooltip: `Editar comunicado`,
        mode: 'UPD',
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'edit',
      },
      {
        tooltip: `Eliminar comunicado`,
        mode: 'DLT',
        className: 'button-eliminar',
        tooltipClassName: 'tooltip-red',
        icon: 'delete',
      },
      {
        tooltip: `Agregar curso`,
        callback: this.agregarCurso,
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'add',
      },
    ];
  }

  agregarCurso = (comunicado: Comunicado) => {
    const dialogRef = this.dialog.open(SeleccionarCursoComponent, {
      height: 'auto',
      width: '700px',
      data: {
        comunicado,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((curso: Curso) => this.addCurso(comunicado, curso));
  };

  addCurso(comunicado: Comunicado, curso: Curso) {
    console.log('comunicado ', comunicado);
    console.log('curso ', curso);
    const comunicadoCurso = new ComunicadoCurso();
    comunicadoCurso.comunicadoId = comunicado.comunicadoId;
    comunicadoCurso.cursoId = curso.cursoId;
    this.comunicadoService
      .publicarComunicadoCurso(comunicadoCurso)
      .subscribe(() => {
        mensajeConfirmacion(
          'Excelente!',
          `Se publicó comunicado exitosamente.`
        ).then();
        this.router.navigate([
          `/${this.autenticacionService
            .getRolSesion()
            .toLocaleLowerCase()}/comunicado`,
        ]);
      });
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      this.createComponent = false;
      // Llamamos al backend para eliminar el registro.
      this.comunicadoService.deleteComunicado(data.id).subscribe((res) => {
        if (this.usuarioLogueado.rol === 'AdministradorFacultad') {
          this.GetComunicadosByFacultadId(
            this.usuarioLogueado.facultad.facultadId
          );
        } else {
          this.getComunicados();
        }
      });
    }
  }

  getComunicados() {
    this.comunicadoService.getComunicados().subscribe((comunicados) => {
      this.comunicados = comunicados.map((comunicado) => ({
        ...comunicado,
        id: comunicado.comunicadoId,
      }));
      this.createComponent = true;
    });
  }

  GetComunicadosByFacultadId(facultadId: string) {
    this.comunicadoService
      .GetComunicadosByFacultadId(facultadId)
      .subscribe((comunicados) => {
        this.comunicados = comunicados.map((comunicado) => ({
          ...comunicado,
          id: comunicado.comunicadoId,
        }));
        this.createComponent = true;
      });
  }
}
