import { Component, Inject, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Seccion } from 'src/app/models/seccion.model';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { SeccionService } from 'src/app/services/seccion.service';

@Component({
  selector: 'app-seleccionar-seccion',
  templateUrl: './seleccionar-seccion.component.html',
  styleUrls: ['./seleccionar-seccion.component.scss'],
})
export class SeleccionarSeccionComponent {
  secciones: Seccion[];
  columnas = ['actions', 'nombre', 'descripcion'];

  constructor(
    private seccionService: SeccionService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getSecciones();
  }

  onSeleccionar(data: SeleccionarRow) {
    if (data.selected) {
      this.seccionService
        .getSeccionById(data.id)
        .subscribe((seccion) => this.dialogRef.close(seccion));
    } else {
      this.dialogRef.close();
    }
  }

  getSecciones() {
    this.seccionService.getSecciones().subscribe((secciones) => {
      this.secciones = secciones.map((seccion) => ({
        ...seccion,
        id: seccion.seccionId,
      }));
    });
  }
}
