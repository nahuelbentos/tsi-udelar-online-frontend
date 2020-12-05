import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions } from 'src/app/models/actions.model';
import { Comunicado } from 'src/app/models/Comunicado';
import { ComunicadoCurso } from 'src/app/models/comunicado-curso';
import { Curso } from 'src/app/models/curso.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ComunicadoService } from 'src/app/services/comunicado.service';
import { SeleccionarCursoComponent } from 'src/app/shared/dialogs/seleccionar-curso/seleccionar-curso.component';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';

@Component({
  selector: 'app-publicar-comunicado-curso',
  templateUrl: './publicar-comunicado-curso.component.html',
  styleUrls: ['./publicar-comunicado-curso.component.scss']
})
export class PublicarComunicadoCursoComponent implements OnInit {
  tipo = TipoUsuario.AdministradorFacultad;
  actions: Actions[] = [];
  constructor(
    public dialog: MatDialog,
    private comunicadoService: ComunicadoService,
    private router: Router,
    private autenticacionService: AutenticacionService,
  ) { }

  ngOnInit(): void {
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
    console.log("comunicado ", comunicado);
    console.log("curso ", curso);
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
        `/${this.autenticacionService.getRolSesion().toLocaleLowerCase()}/comunicado`,
      ]);
    });
  }

}
