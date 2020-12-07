import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Actions } from 'src/app/models/actions.model';
import { Actividad } from 'src/app/models/actividad.model';
import { Seccion } from 'src/app/models/seccion.model';
import { ActividadService } from 'src/app/services/actividad.service';
import { CursoSeccionService } from 'src/app/services/curso-seccion.service';
import { mensajeConfirmacion } from 'src/app/utils/sweet-alert';
import { SeleccionarActividadComponent } from '../seleccionar-actividad/seleccionar-actividad.component';

@Component({
  selector: 'app-ver-curso-secciones',
  templateUrl: './ver-curso-secciones.component.html',
  styleUrls: ['./ver-curso-secciones.component.scss'],
})
export class VerCursoSeccionesComponent implements OnInit {
  secciones: Seccion[] = [];
  actionsHeader: Actions[] = [{}];
  actions: Actions[] = [{}];

  cursoId: string;
  cursoNombre: string;
  constructor(
    private cursoSeccionService: CursoSeccionService,
    private actividadService: ActividadService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);

    this.cursoId = data.cursoId;
    this.cursoNombre = data.cursoNombre;
  }

  ngOnInit(): void {
    this.cursoSeccionService
      .getSeccionesByCurso(this.cursoId)
      .subscribe((secciones) => (this.secciones = secciones));

    this.actions = [
      {
        tooltip: `Agregar Actividad`,
        callback: this.addActividad,
        backgroundColor: '#d50000',
        icon: 'add_task',
      },
    ];
  }

  addActividad = (seccion: Seccion) => {
    const dialogRef = this.dialog.open( SeleccionarActividadComponent, {
      height: 'auto',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe( (actividad: Actividad) => {

      if (actividad) { 
        this.cursoSeccionService
          .addActividad(this.cursoId, seccion.seccionId, actividad.actividadId)
          .subscribe((res) =>
            mensajeConfirmacion(
              'Excelente!',
              `Se ha agregado la actividad al curso ${this.cursoNombre} en la sección ${seccion.nombre} ,exitosamente`
            )
          );
      }
    });

  };
}
