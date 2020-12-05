import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Facultad } from 'src/app/models/facultad.model';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { FacultadService } from 'src/app/services/facultad.service';

@Component({
  selector: 'app-seleccionar-facultad',
  templateUrl: './seleccionar-facultad.component.html',
  styleUrls: ['./seleccionar-facultad.component.scss'],
})
export class SeleccionarFacultadComponent {
  facultades: Facultad[];
  columnas = ['actions', 'nombre', 'descripcion'];

  constructor(
    private facultadService: FacultadService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getFacultades();
  }

  onSeleccionar(data: SeleccionarRow) {
    if (data.selected) {
      this.facultadService
        .getFacultadById(data.id)
        .subscribe((facultad) => this.dialogRef.close(facultad));
    } else {
      this.dialogRef.close();
    }
  }

  getFacultades() {
    this.facultadService.getFacultades().subscribe((facultades) => {
      this.facultades = facultades.map((facultad) => ({
        ...facultad,
        id: facultad.facultadId,
      }));
    });
  }
}
