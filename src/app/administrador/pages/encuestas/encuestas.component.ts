import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions } from 'src/app/models/actions.model';
import { Actividad } from 'src/app/models/actividad.model';
import { TipoUsuario } from 'src/app/models/tipo-usuario.enum';
import { RespuestasComponent } from 'src/app/shared/dialogs/respuestas/respuestas.component';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss']
})
export class EncuestasComponent implements OnInit {
  tipo = TipoUsuario.Docente;
  actions: Actions[];
  constructor(
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.actions = [
      {
        tooltip: `Editar encuesta`,
        mode: 'UPD',
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'edit',
      },
      {
        tooltip: `Eliminar encuesta`,
        mode: 'DLT',
        className: 'button-eliminar',
        tooltipClassName: 'tooltip-red',
        icon: 'delete',
      },
      {
        tooltip: `Ver respuestas`,
        callback: this.verRespuestas,
        className: 'button-editar',
        tooltipClassName: 'tooltip-blue',
        icon: 'remove_red_eye',
      },
    ];
  }
  verRespuestas = (actividad: Actividad) => {
    const dialogRef = this.dialog.open(RespuestasComponent, {
      height: 'auto',
      width: '700px',
      data: actividad,
    });
  };
}
