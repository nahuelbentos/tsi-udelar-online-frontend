import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Carrera } from 'src/app/models/carrera.model';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { CarreraService } from 'src/app/services/carrera.service';

@Component({
  selector: 'app-seleccionar-carrera',
  templateUrl: './seleccionar-carrera.component.html',
  styleUrls: ['./seleccionar-carrera.component.scss'],
})
export class SeleccionarCarreraComponent {
  carreras: Carrera[];
  columnas = ['actions', 'nombre', 'descripcion'];

  constructor(
    private carreraService: CarreraService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getCarreras();
  }

  onSeleccionar(data: SeleccionarRow) {
    if (data.selected) {
      this.carreraService
        .getCarreraById(data.id)
        .subscribe((carrera) => this.dialogRef.close(carrera));
    } else {
      this.dialogRef.close();
    }
  }

  getCarreras() {
    this.carreraService.getCarreras().subscribe((carrera) => {
      // tslint:disable-next-line: no-shadowed-variable
      this.carreras = carrera.map((carrera) => ({ ...carrera, id: carrera.carreraId }));
    });
  }
}
