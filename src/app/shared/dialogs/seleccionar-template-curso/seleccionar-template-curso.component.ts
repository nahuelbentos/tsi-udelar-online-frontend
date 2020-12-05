import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeleccionarRow } from 'src/app/models/seleccionar-row.interface';
import { TemplateCurso } from 'src/app/models/template-curso.model';
import { CursoService } from 'src/app/services/curso.service';
import { TemplatecursoService } from 'src/app/services/templatecurso.service';

@Component({
  selector: 'app-seleccionar-template-curso',
  templateUrl: './seleccionar-template-curso.component.html',
  styleUrls: ['./seleccionar-template-curso.component.scss'],
})
export class SeleccionarTemplateCursoComponent  {

  templateCursos: TemplateCurso[];
  columnas = ['actions', 'nombre', 'descripcion'];

  constructor(
    private templateCursoService: TemplatecursoService,
    public dialogRef: MatDialogRef<any>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getTemplateCursos();
  }

  onSeleccionar(data: SeleccionarRow) {
    if (data.selected) {
      this.templateCursoService
        .getTemplateCursoById(data.id)
        .subscribe((curso) => this.dialogRef.close(curso));
    } else {
      this.dialogRef.close();
    }
  }

  getTemplateCursos() {
    this.templateCursoService.getTemplateCursos().subscribe((templateCursos) => {
      // tslint:disable-next-line: no-shadowed-variable
      this.templateCursos = templateCursos.map((templateCurso) => ({ ...templateCurso, id: templateCurso.templateCursoId }));
    });
  }
}
