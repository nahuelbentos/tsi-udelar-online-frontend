import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Foro } from 'src/app/models/foro.model';
import { Seccion } from 'src/app/models/seccion.model';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { ForoService } from 'src/app/services/foro.service';
import { SeccionService } from 'src/app/services/seccion.service';

@Component({
  selector: 'app-seleccionar-foro',
  templateUrl: './seleccionar-foro.component.html',
  styleUrls: ['./seleccionar-foro.component.scss']
})
export class SeleccionarForoComponent  {
  foros: Foro[];
  columnas = ['actions', 'nombre', 'descripcion'];

  constructor(
    private foroService: ForoService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getForos();
  }

  onSeleccionar(data: SeleccionarRow) {
    if (data.selected) {
      this.foroService
        .getForoById(data.id)
        .subscribe((foro) => this.dialogRef.close(foro));
    } else {
      this.dialogRef.close();
    }
  }

  getForos() {
    this.foroService.getForos().subscribe((foros) => {
      this.foros = foros.map((foro) => ({
        ...foro,
        id: foro.foroId,
      }));
    });
  }
}
