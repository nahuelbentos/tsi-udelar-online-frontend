import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actividad } from 'src/app/models/actividad.model';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { ActividadService } from 'src/app/services/actividad.service';

@Component({
  selector: 'app-seleccionar-actividad',
  templateUrl: './seleccionar-actividad.component.html',
  styleUrls: ['./seleccionar-actividad.component.scss'],
})
export class SeleccionarActividadComponent{
  actividades: Actividad[];
  columnas = ['actions', 'nombre', 'descripcion', 'tipo'];

  constructor(
    private actividadService: ActividadService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getActividades();
  }

  onSeleccionar(data: SeleccionarRow) {
    if (data.selected) {
      this.actividadService
        .getActividadById(data.id)
        .subscribe((actividad) => this.dialogRef.close(actividad));
    } else {
      this.dialogRef.close();
    }
  }

  getActividades() {
    this.actividadService.getActividades().subscribe((actividades) => {
      this.actividades = actividades.map((actividad) => ({
        ...actividad,
        id: actividad.actividadId,
      }));
    });
  }
}
