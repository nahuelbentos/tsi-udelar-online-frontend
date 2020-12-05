import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Carrera } from 'src/app/models/carrera.model';
import { Curso } from 'src/app/models/curso.model';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-seleccionar-usuario',
  templateUrl: './seleccionar-usuario.component.html',
  styleUrls: ['./seleccionar-usuario.component.scss'],
})
export class SeleccionarUsuarioComponent {
  usuarios: Usuario[] = [];
  columnas = ['actions', 'nombres', 'apellidos', 'id'];

  constructor(
    private usuarioService: UsuarioService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const refId = data && data.refId ? data.refId : null;
    const tipo = data && data.tipo ? data.tipo : null;
    this.getUsuarios(refId, tipo);
  }

  onSeleccionar(data: SeleccionarRow) {
    if (data.selected) {
      this.usuarioService
        .getUsuarioById(data.id)
        .subscribe((curso) => this.dialogRef.close(curso));
    } else {
      this.dialogRef.close();
    }
  }

  getUsuarios(refId?, tipo?: string) {
    switch (tipo) {
      case 'docenteByCurso':
        this.usuarioService
          .getDocentesByCurso(refId)
          .subscribe((usuarios) => (this.usuarios = usuarios));
        break;

      case 'docenteByFacultad':
        this.usuarioService
          .getDocentesByFacultad(refId)
          .subscribe((usuarios) => (this.usuarios = usuarios));
        break;

      default:
        this.usuarioService
          .getUsuarios()
          .subscribe((usuarios) => (this.usuarios = usuarios));
        break;
    }
  }
}
