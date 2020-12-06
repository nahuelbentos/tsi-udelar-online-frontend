import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions } from 'src/app/models/actions.model';
import { AlumnoCurso } from 'src/app/models/alumno-curso.model';
import { AlumnoPruebaOnline } from 'src/app/models/alumno-prueba-online.model';
import { AlumnoCursoService } from 'src/app/services/alumno-curso.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-mis-calificaciones',
  templateUrl: './mis-calificaciones.component.html',
  styleUrls: ['./mis-calificaciones.component.scss'],
})
export class MisCalificacionesComponent implements OnInit {
  usuarioLogueado = this.autenticacionService.getUser();

  cursoId: string;
  actions: Actions[] = [];
  actionsHeader: Actions[] = [{}];
  actionsActividades: Actions[] = [];
  actionsHeaderActividades: Actions[] = [{}];
  alumnoCurso: AlumnoCurso[] = [];
  alumnoEvaluacion: AlumnoPruebaOnline[] = [];
  
  columnas = ['curso', 'feedback', 'calificacion'];
  columnasActividades = ['evaluacion', 'nota'];

  constructor(
    private autenticacionService: AutenticacionService,
    private alumnoService: AlumnoService,
    private alumnoCursoService: AlumnoCursoService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.cursoId = data.cursoId;
  }

  ngOnInit(): void {
    this.alumnoService
      .getEvaluaciones(this.usuarioLogueado.id)
      .subscribe((evaluaciones) => (this.alumnoEvaluacion = evaluaciones));

    this.alumnoCursoService
      .getAlumnoCursoById(this.usuarioLogueado.id, this.cursoId)
      .subscribe((cursos) => {
        const aux: AlumnoCurso[] = [];
        aux.push(cursos);
        this.alumnoCurso = aux;
      });
  }
}
