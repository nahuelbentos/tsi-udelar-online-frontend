import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Carrera } from 'src/app/models/carrera.model';
import { Curso } from 'src/app/models/curso.model';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-seleccionar-curso',
  templateUrl: './seleccionar-curso.component.html',
  styleUrls: ['./seleccionar-curso.component.scss'],
})
export class SeleccionarCursoComponent {
  cursos: Curso[];
  columnas = ['actions', 'nombre', 'descripcion'];

  constructor(
    private cursoService: CursoService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const carrera = data && data.carrera ? data.carrera : null;
    const tipo = data && data.tipo ? data.tipo : null;
    this.getCursos(carrera, tipo);
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

  getCursos(carrera?: Carrera, remover?: boolean) {
    remover
      ? this.cursoService
          .getCursosByCarrera(carrera.carreraId)
          .subscribe((cursos) => {
            // tslint:disable-next-line: no-shadowed-variable
            this.cursos = cursos.map((curso) => ({
              ...curso,
              id: curso.cursoId,
            }));
          })
      : this.cursoService.getCursos().subscribe((cursos) => {
          // tslint:disable-next-line: no-shadowed-variable
          this.cursos = cursos.map((curso) => ({
            ...curso,
            id: curso.cursoId,
          }));
        });
  }
}
