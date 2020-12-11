import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PruebaOnline } from 'src/app/models/prueba-online.model';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { PruebaOnlineService } from 'src/app/services/prueba-online.service';

@Component({
  selector: 'app-seleccionar-pruebas-online',
  templateUrl: './seleccionar-pruebas-online.component.html',
  styleUrls: ['./seleccionar-pruebas-online.component.scss']
})
export class SeleccionarPruebasOnlineComponent {
  usuarioLogueado = this.auth.getUser();
  pruebasOnline: PruebaOnline[];
  columnas = ['actions', 'nombre', 'descripcion'];

  constructor(
    private pruebaOnlineService: PruebaOnlineService,
    public dialogRef: MatDialogRef<any>,
    private auth: AutenticacionService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getPruebasOnline();
  }

  onSeleccionar(data: SeleccionarRow) {
    console.log("pruebasOnline:: ", this.pruebasOnline);
    console.log("data::::: ", data);
    
    if (data.selected) {
      this.pruebaOnlineService
      .getPruebaOnlineById(data.id)
      .subscribe((pruebaOnline) => this.dialogRef.close(pruebaOnline));
    } else {
      this.dialogRef.close();
    }
  }

  getPruebasOnline() {
   this.pruebaOnlineService
          .getPruebasOnline(this.usuarioLogueado.id)
          .subscribe((pruebasOnline) => {
            this.pruebasOnline = pruebasOnline.map((pruebaOnline) => ({
              ...pruebaOnline,
              id: pruebaOnline.actividadId,
            }));
          })
  }
}
