import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Actions } from 'src/app/models/actions.model';
import { AlumnoCurso } from 'src/app/models/alumno-curso.model';
import { EliminarRow } from 'src/app/models/eliminiar-row.interface';
import { AlumnoCursoService } from 'src/app/services/alumno-curso.service';

@Component({
  selector: 'app-gestion-alumnocurso',
  templateUrl: './gestion-alumnocurso.component.html',
  styleUrls: ['./gestion-alumnocurso.component.scss'],
})
export class GestionAlumnocursoComponent implements OnInit, OnChanges {
  @Input() tipoSingular = 'alumnocurso';
  @Input() tituloPlural = 'alumnoscurso';

  @Input() alumnosCurso: AlumnoCurso[];
  @Input() actions: Actions[] = [];
  @Input() actionsHeader: Actions[] = [];
  @Input() columnas = ['calificacion', 'actions'];

  constructor(private alumnoCursoService: AlumnoCursoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('gestionalumno curso:: ', changes);
    
    if (changes.alumnosCurso && changes.alumnosCurso.currentValue) {
      this.alumnosCurso = changes.alumnosCurso.currentValue.map(
        (alumnoCurso) => ({
          ...alumnoCurso,
          id: alumnoCurso.alumnoCursoId,
        })
      );
    }

    if (changes.columnas && changes.columnas.currentValue) {
      this.columnas = changes.columnas.currentValue;
    }
    
    if (changes.actions && changes.actions.currentValue) {
      this.actions = changes.actions.currentValue;
    }

    if (changes.actionsHeader && changes.actionsHeader.currentValue) {
      this.actionsHeader = changes.actionsHeader.currentValue;
    }
  }

  ngOnInit(): void {
    this.getAlumnosCurso();
  }

  onEliminar(data: EliminarRow) {
    if (data.elimino) {
      // Llamamos al backend para eliminar el registro.
      this.alumnoCursoService
        .deleteAlumnoCurso(data.id)
        .subscribe((res) => this.getAlumnosCurso());
    }
  }

  getAlumnosCurso() {
    if (!this.alumnosCurso) {
      this.alumnoCursoService.getAlumnosCurso().subscribe((alumnosCurso) => {
        this.alumnosCurso = alumnosCurso;
      });
    }
  }
}
