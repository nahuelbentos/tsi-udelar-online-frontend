import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions } from 'src/app/models/actions.model';
import { Comunicado } from 'src/app/models/Comunicado';
import { Curso } from 'src/app/models/curso.model';

@Component({
  selector: 'app-ver-comunicados',
  templateUrl: './ver-comunicados.component.html',
  styleUrls: ['./ver-comunicados.component.scss'],
})
export class VerComunicadosComponent implements OnInit {
  curso: Curso;
  actions: Actions[] = [{}];
  actionsHeader: Actions[] = [{}];
  comunicados: Comunicado[] = [];
  columnas = ['nombre', 'descripcion', 'url', 'actions'];
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.curso = data.curso;
    console.log('curso:: ', this.curso);
    
  }

  ngOnInit(): void {
    
    this.comunicados = this.curso.comunicados;
  }
}
