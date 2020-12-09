import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/models/curso.model';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-seleccionar-curso-by-facultad',
  templateUrl: './seleccionar-curso-by-facultad.component.html',
  styleUrls: ['./seleccionar-curso-by-facultad.component.scss'],
})
export class SeleccionarCursoByFacultadComponent  {
  usuario = this.auth.getUser();
  cursos: Curso[];
  columnas = ['actions', 'nombre', 'descripcion'];

  constructor(
    private cursoService: CursoService,
    private auth: AutenticacionService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getCursos();
  }

  onSeleccionar(data: SeleccionarRow) {
    if (data.selected) {
      this.cursoService
        .getCursoById(data.id)
        .subscribe((curso) => this.dialogRef.close(curso));
    } else {
      this.dialogRef.close();
    }
  }

  getCursos() {
    this.cursoService
      .getCursosByFacultad(this.usuario.facultad.facultadId)
      .subscribe((cursos) => {
        // tslint:disable-next-line: no-shadowed-variable
        this.cursos = cursos.map((curso) => ({
          ...curso,
          id: curso.cursoId,
        }));
      });
  }
}
