import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from 'src/app/models/curso.model';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-seleccionar-curso',
  templateUrl: './seleccionar-curso.component.html',
  styleUrls: ['./seleccionar-curso.component.scss'],
})
export class SeleccionarCursoComponent{

  cursos: Curso[];
  columnas = ['actions', 'nombre', 'descripcion'];

  constructor(
    private cursoService: CursoService,
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
    }
    this.dialogRef.close();
  }

  getCursos() {
    this.cursoService.getCursos().subscribe((curso) => {

      // tslint:disable-next-line: no-shadowed-variable
      this.cursos = curso.map((curso) => ({ ...curso, id: curso.cursoId }));
    });
  }
}
