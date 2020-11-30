import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comunicado } from 'src/app/models/Comunicado';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { ComunicadoService } from 'src/app/services/comunicado.service';

@Component({
  selector: 'app-seleccionar-comunicado',
  templateUrl: './seleccionar-comunicado.component.html',
  styleUrls: ['./seleccionar-comunicado.component.scss']
})
export class SeleccionarComunicadoComponent{
  comunicados: Comunicado[];
  columnas = ['actions', 'nombre', 'descripcion'];

  constructor(
    private comunicadoService: ComunicadoService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getCarreras();
  }

  onSeleccionar(data: SeleccionarRow) {
    if (data.selected) {
      this.comunicadoService
        .getComunicadoById(data.id)
        .subscribe((comunicado) => this.dialogRef.close(comunicado));
    }
    this.dialogRef.close();
  }

  getCarreras() {
    this.comunicadoService.getComunicados().subscribe((comunicado) => {
      // tslint:disable-next-line: no-shadowed-variable
      this.comunicados = comunicado.map((comunicado) => ({ ...comunicado, id: comunicado.comunicadoId }));
    });
  }
}
